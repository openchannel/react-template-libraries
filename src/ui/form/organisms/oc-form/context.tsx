// @ts-nocheck

import * as React from 'react';

import produce from 'immer';
import get from 'lodash/get';
import update from 'lodash/update';
import flatMapDeep from 'lodash/flatMapDeep';
import { FIELD_TYPE } from '../../lib';
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

const updateNestedFields = (element, formikValues, isReset) => {
	if (!element.fields) {
		return {};
	}

	return {
		fields: element.fields.map((f) => ({
			...f,
			...toggleFieldEditable(f, isReset),
			...setFieldValueByName(f, formikValues, isReset),
		}))
	};
}

const updateElement = (element, formikValues, isReset) => ({
	...element,
	...toggleFieldEditable(element, isReset),
	...setFieldValueByName(element, formikValues, isReset),
	...updateNestedFields(element, formikValues, isReset),
});

const updateFieldsDefinition = (arr: any[], fieldName: string, formikValues: any, isReset) => {
	return arr.map((element) => {
		if (element.name === fieldName) {
			return updateElement(element, formikValues, isReset);
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition(element.fields, fieldName, formikValues, isReset),
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
	flatMap: (fields) => (
		fields.reduce((acc, item) => (
			item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY ? [ ...acc, item, ...fieldsUtils.flatMap(item.fields) ] : [...acc, item]
		), [])
	),
	dumpDeepNestedFields: (fields, depth = 0) => {
		// let initialDepth = 0;

		return fields.map((el) => {
			if (el.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
				if (depth !== 0) {
					return { ...el, fields: fieldsUtils.dumpDeepNestedFields(el.fields, depth - 1) };
				}
				return { ...el, fields: [] };
			}
			return el;
		})
	}
};

const elementUtils = {
	getParentPath: (path) => {
		if (path.length <= 1) {
			return {
				path,
				isFirstLevelDeep: true,
			};
		}

		const modified = path.substring(0, path.lastIndexOf('.'));

		return {
			path: modified,
			isFirstLevelDeep: modified.length <= 1,
		};
	},
	clone: (element) => {
		return {
			...element,
			...elementUtils.dumpNestedFields(element),
		};
	},
	generateBy: (element) => {
		return {
			...element,
			value: '',
			isEditing: true,
			isNew: true,
			...elementUtils.dumpNestedFields(element),
		};
	},
	dumpNestedFields: (element) => {
		console.log('element', element)
		if (element.type !== FIELD_TYPE.DYNAMIC_FIELD_ARRAY) return {};

		return {
			fields: element.fields.map(el => ({ ...elementUtils.clone(el), fields: [] }))
		};
	},
};


export const OcFormContextProvider = ({ children, initialValue }) => {
	const sourceFields = React.useRef(initialValue.fields);
	const [flattenFields] = React.useState(fieldsUtils.flatMap(initialValue.fields));

	const [fieldsDefinition, setFieldsDefinition] = React.useState(fieldsUtils.dumpDeepNestedFields(sourceFields.current));

	console.log('fieldsDefinition', fieldsDefinition)

	const toggleEditingField = React.useCallback((fieldName: string, formikValues) => {
		setFieldsDefinition(prev => updateFieldsDefinition(prev, fieldName, formikValues));
	}, []);

	const resetField = React.useCallback((fieldName) => {
		setFieldsDefinition(prev => updateFieldsDefinition(prev, fieldName, null, true));
	}, []);

	const fillDynamicField = (deepElementName) => {
		const copiedElement = flattenFields.find(item => item.name === deepElementName);

		const { path, isFirstLevelDeep } = elementUtils.getParentPath(copiedElement.path);

		setFieldsDefinition(prev => {
			let next = [ ...prev ];

			if (isFirstLevelDeep) {
				const isAlreadyExistInState = Boolean(prev[copiedElement.index]);

				if (isAlreadyExistInState) {
					next[copiedElement.index] = elementUtils.clone(copiedElement);
				} else {
					next.push(elementUtils.generateBy(copiedElement))
				}

			} else {
				next = update(prev, path, (el) => {
					const isAlreadyExistInState = el[copiedElement.index];

					if (isAlreadyExistInState.fields.length === 0) {
						el[copiedElement.index] = elementUtils.clone(copiedElement);
					} else {
						el.push(elementUtils.generateBy(copiedElement))
					}

					return el;
				})
			}

			return normalizeFieldsForFormik(next)
		})
	};

	console.log('fieldsDefinition', fieldsDefinition)

	return (
		<OcFormContext.Provider value={{
			fieldsDefinition,
			toggleEditingField,
			resetField,
			fillDynamicField,
		}}>
			{children}
		</OcFormContext.Provider>
	)
}
