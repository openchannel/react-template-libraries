// @ts-nocheck

import { nanoid } from 'nanoid';
import * as React from 'react';
import { useFormikContext } from 'formik';

import _ from 'lodash';
import produce from 'immer';
import get from 'lodash/get';
import update from 'lodash/update';
import flatMapDeep from 'lodash/flatMapDeep';
import { FIELD_TYPE } from '../../lib';
import { getInitialValuesFromFields } from './utils';
import { getNewName } from './utils';
import { updateElementKeys } from './utils';
import { normalizeFieldsForFormik } from './utils';

export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

const setFieldValueByName = ({ element, formikValues = null, isReset, isCancel }) => (
	isReset
		? {
			value: element.defaultValue || '',
			previousValue: element.defaultValue || '',
		}
		: formikValues === null
		? {}
		: isCancel
			? {
				value: element.previousValue,
				previousValue: element.defaultValue || '',
			} : {
				value: formikValues[element.name]
					? formikValues[element.name]
					: element.value,
				previousValue: (formikValues[element.name]
					? formikValues[element.name]
					: element.value) || (element.defaultValue || ''),
			}
);


const setFieldEditable = ({ isReset, isEditing }) => ({ isEditing: (isReset || isEditing) });

const updateNestedFields = (params) => {
	if (!params.element.fields) {
		return {};
	}

	return {
		fields: params.element.fields.map((f) => ({
			...f,
			...setFieldEditable({ ...params, element: f }),
			...setFieldValueByName({ ...params, element: f }),
		})),
	};
}

const updateElement = (params) => ({
	...params.element,
	isNew: false,
	...setFieldEditable(params),
	...setFieldValueByName(params),
	...updateNestedFields(params),
});

const updateFieldsDefinition = (params) => {
	return params.data.map((element) => {
		if (element.name === params.fieldName) {
			return updateElement({ ...params, element });
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition({ ...params, data: element.fields }),
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
	cloneAndUpdate: (element, isNew = false) => ({
		...element,
		...elementUtils.updateNestedFields(element),
		name: getNewName(element),
		value: element.defaultValue || '',
		previousValue: element.defaultValue || '',
		isEditing: true,
		isNew,
	}),
};


const removeElement = (array, element) => {
	if (array.length === 1) {
		array[element.index] = {
			...element,
			// value: element.previousValue,
			// previousValue: element.defaultValue || '',
			isEditing: false,
			fields: [],
		};
	} else {
		array.splice(element.index, 1);
	}

	return array;
}


export const OcFormContextProvider = ({ children, initialValue }) => {
	const sourceFields = React.useRef(initialValue.fields);
	const [flattenFields] = React.useState(fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(initialValue.fields), 0));
	const [fieldsDefinition, setFieldsDefinition] = React.useState(fieldsUtils.dumpDeepFields(sourceFields.current));

	const formik = useFormikContext();

	console.log('formik', formik)
	console.log('flattenFields', flattenFields)
	console.log('fieldsDefinition', fieldsDefinition)

	const startFieldEditing = (fieldName: string) => {
		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				data: prev,
				fieldName,
				// formikValues: formik.values,
				isEditing: true,
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
		const instance = flattenFields.find(item => item.staticId === deepElementName);
		const { path, isFirstLevelDeep } = elementUtils.getParentPath(deepElementPath);

		setFieldsDefinition(prev => {
			let next = [ ...prev ];
			const existedElement = get(next, deepElementPath);

			if (isFirstLevelDeep) {
				if (existedElement.fields.length === 0) {
					next[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
				} else {
					next.push(elementUtils.cloneAndUpdate(instance, true))
				}
			} else {
				next = update(prev, path, (fields) => {
					if (existedElement.fields.length === 0) {
						fields[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
					} else {
						fields.push(elementUtils.cloneAndUpdate(instance, true))
					}

					return fields;
				})
			}

			return normalizeFieldsForFormik(updateElementKeys)(next)
		});
	};

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

	const updateFormikValues = (values) => {
		formik.setValues(values);
	}


	const onCancelField = (elementName: string, elementPath: string, elementIndex) => {
		console.log('stopFieldEditing elementName', elementName)
		console.log('stopFieldEditing elementPath', elementPath)

		const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);

		console.log('path', path)
		console.log('isFirstLevelDeep', isFirstLevelDeep)

		let next = [ ...fieldsDefinition ];
		const existedElement = get(next, elementPath);

		console.log('existedElement', existedElement)

		if (isFirstLevelDeep) {
			if (existedElement.isNew) {
				if (next.length === 1) {
					next[existedElement.index] = {
						...existedElement,
						value: existedElement.previousValue,
						isEditing: false,
						fields: [],
					};
				} else {
					next.splice(existedElement.index, 1);
				}
			} else {
				next[existedElement.index] = {
					...existedElement,
					value: existedElement.previousValue,
					isEditing: false,
					fields: existedElement.fields.map((el) => ({
						...el,
						value: el.previousValue,
						isEditing: false,
					})),
				};
			}
		} else {
			next = update(fieldsDefinition, path, (fields) => {
				if (existedElement.isNew) {
					if (fields.filter(f => f.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY).length === 1) {
						fields[existedElement.index] = {
							...existedElement,
							value: existedElement.previousValue,
							isEditing: false,
							fields: [],
						};
					} else {
						fields.splice(existedElement.index, 1);
					}
				} else {
					fields[existedElement.index] = {
						...existedElement,
						value: existedElement.previousValue,
						isEditing: false,
						fields: existedElement.fields.map((el) => ({
							...el,
							value: el.previousValue,
							isEditing: false,
						})),
					};
				}

				return fields;
			});
		}

		next = normalizeFieldsForFormik(updateElementKeys)(next);

		setFieldsDefinition(next);
		formik.setValues(getInitialValuesFromFields(next));
	};

	const onSaveField = (elementName: string, elementPath: string, elementIndex) => {

	}

	return (
		<OcFormContext.Provider value={{
			fieldsDefinition,
			toggleEditingField: () => {},
			resetField,
			fillDynamicField,
			startFieldEditing,
			stopFieldEditing,
			onCancelField,
			onSaveField,
		}}>
			{children}
		</OcFormContext.Provider>
	)
}
