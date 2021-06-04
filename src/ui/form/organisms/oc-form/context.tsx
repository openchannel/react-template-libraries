// @ts-nocheck

import { nanoid } from 'nanoid';
import * as React from 'react';
import { useFormikContext } from 'formik';

import produce from 'immer';
import get from 'lodash/get';
import update from 'lodash/update';
import flatMapDeep from 'lodash/flatMapDeep';
import { FIELD_TYPE } from '../../lib';
import { updateElementKeys } from './utils';
import { normalizeFieldsForFormik } from './utils';

export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

const setFieldValueByName = (element, formikValues = null, isReset = false) => (
	isReset
		? { value: element.defaultValue || '' }
		: formikValues === null
		? {}
		: { value: formikValues[element.name] ? formikValues[element.name] : element.value }
);

const toggleFieldEditable = (element, isReset = false) => ({ isEditing: (isReset || !element.isEditing) });

const setFieldEditable = (element, isReset = false, isEditing) => ({ isEditing: (isReset || isEditing) });

const updateNestedFields = (element, formikValues, isReset, isEditing) => {
	if (!element.fields) {
		return {};
	}

	return {
		fields: element.fields.map((f) => ({
			...f,
			...setFieldEditable(f, isReset, isEditing),
			...setFieldValueByName(f, formikValues, isReset),
		}))
	};
}

const updateElement = ({ element, formikValues, isReset, isEditing }) => ({
	...element,
	...setFieldEditable(element, isReset, isEditing),
	...setFieldValueByName(element, formikValues, isReset),
	...updateNestedFields(element, formikValues, isReset, isEditing),
});

const updateFieldsDefinition = ({ data, fieldName, formikValues, isReset, isEditing }) => {
	return data.map((element) => {
		if (element.name === fieldName) {
			return updateElement({ element, formikValues, isReset, isEditing });
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition({ data: element.fields, fieldName, formikValues, isReset, isEditing }),
			};
		}

		return element;
	});
}



const omitFields = (fields) => {
	return fields.map((el) => el.type === 'dynamicFieldArray' ? ({ ...el, fields: [] }) : el)
}

const deepFindFields = (arr, name, fn) => {
	return arr.reduce((acc, item) => {
		if (item.name === name) {
			return fn(item.fields);
		}

		if (item.type === 'dynamicFieldArray') {
			return deepFindFields(item.fields, name)
		}

		return acc;
	}, [])
}

const omitNestedFields = (deepElementName, fields, sourceFields) => {
	return fields.map((el) => {
		if (el.name === deepElementName) {
			return {...el, fields: deepFindFields(sourceFields, deepElementName, omitFields) }
		}
		if (el.type === 'dynamicFieldArray') {
			return { ...el, fields: omitNestedFields(deepElementName, el.fields, sourceFields) };
		}
		return el;
	})
}

const fieldsUtils = {
	flatMap: (arr) => (
		arr.reduce((acc, item) => (
			item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY
				? [ ...acc, item, ...fieldsUtils.flatMap(item.fields) ]
				: [ ...acc, item ]
		), [])
	),
	dumpDeepFields: (arr, depth = 1) => (
		arr.map((el) => {
			if (el.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
				if (depth !== 0) {
					return { ...el, fields: [] };
				}
				return { ...el, fields: fieldsUtils.dumpDeepFields(el.fields, depth + 1) };
			}
			return el;
		})
	),
};

const elementUtils = {
	getParentPath: (path) => {
		// if (path.length <= 1) {
		// 	return {
		// 		path,
		// 		isFirstLevelDeep: true,
		// 	};
		// }

		const modified = path.substring(0, path.lastIndexOf('.'));

		return {
			original: path,
			path: modified,
			isFirstLevelDeep: modified.length <= 1,
			depth: path.split('.').length - 1,
		};
	},
	updateNestedFields: (element) => (
		element.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY
			? { fields: element.fields.map(el => ({ ...elementUtils.cloneAndUpdate(el) })) }
			: {}
	),
	cloneAndUpdate: (element) => {
		return {
			...element,
			...elementUtils.updateNestedFields(element),
			name: `${element.id}-${nanoid()}`,
			value: element.defaultValue || '',
			isEditing: true,
			isNew: false,
		};
	},
};


export const OcFormContextProvider = ({ children, initialValue }) => {
	const sourceFields = React.useRef(initialValue.fields);
	const [flattenFields] = React.useState(fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(initialValue.fields), 0));
	const [fieldsDefinition, setFieldsDefinition] = React.useState(fieldsUtils.dumpDeepFields(sourceFields.current));

	const formik = useFormikContext();

	console.log('formik', formik)
	console.log('flattenFields', flattenFields)

	const startFieldEditing = (fieldName: string) => {
		console.log('startFieldEditing fieldName', fieldName)
		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				data: prev,
				fieldName,
				formikValues: formik.values,
				isEditing: true,
			})
		);
	}

	const stopFieldEditing = (fieldName: string) => {
		console.log('stopFieldEditing fieldName', fieldName)
		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				data: prev,
				fieldName,
				formikValues: formik.values,
				isEditing: false,
			})
		);
	}

	const resetField = React.useCallback((fieldName) => {
		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				data: prev,
				fieldName,
				isReset: true,
			})
		);
	}, []);

	const fillDynamicField = (deepElementName, deepElementPath) => {
		const copiedElement = flattenFields.find(item => (item.name === deepElementName) || (item.staticId === deepElementName));

		console.log('copiedElement', copiedElement)

		const { path, isFirstLevelDeep } = elementUtils.getParentPath(deepElementPath);

		setFieldsDefinition(prev => {
			let next = [ ...prev ];

			if (isFirstLevelDeep) {
				const isAlreadyExistInState = prev[copiedElement.index];

				if (isAlreadyExistInState.fields.length === 0) {
					next[copiedElement.index] = elementUtils.cloneAndUpdate(copiedElement);
				} else {
					next.push(elementUtils.cloneAndUpdate(copiedElement))
				}
			} else {
				next = update(prev, path, (el) => {
					const isAlreadyExistInState = el[copiedElement.index];

					if (isAlreadyExistInState.fields.length === 0) {
						el[copiedElement.index] = elementUtils.cloneAndUpdate(copiedElement);
					} else {
						el.push(elementUtils.cloneAndUpdate(copiedElement))
					}

					return el;
				})
			}

			return normalizeFieldsForFormik(updateElementKeys)(next)
		})
	};

	console.log('fieldsDefinition', fieldsDefinition)

	return (
		<OcFormContext.Provider value={{
			fieldsDefinition,
			toggleEditingField: () => {},
			resetField,
			fillDynamicField,
			startFieldEditing,
			stopFieldEditing,
		}}>
			{children}
		</OcFormContext.Provider>
	)
}
