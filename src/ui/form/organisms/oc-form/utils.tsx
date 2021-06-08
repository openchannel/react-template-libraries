// @ts-nocheck
import { nanoid } from 'nanoid';

import { FIELD_TYPE } from '../../lib';
import { AppFormField, FormikField } from './types';

export const getNewName = (element) => `${element.id}-${nanoid()}`;

export const extendElementWithRequiredKeys = (element, { path, index }) => ({
	...element,
	index,
	path,
	staticId: nanoid(), // use as unique non-updatable element id
	name: getNewName(element),
	value: element.defaultValue || '',
	previousValue: element.defaultValue || '',
	isEditing: true,
	isNew: true,
});

export const updateElementKeys = (element, { path, index }) => ({
	...element,
	index,
	path,
});

export const normalizeFieldsForFormik = (todo) => (fields: AppFormField[], { deepPath } = {}) => {
	return fields.map((element, index) => {
		const path: string = deepPath ? `${deepPath}.fields.${index}` : `${index}`;

		if (element.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			return {
				...todo(element, { path, index }),
				fields: normalizeFieldsForFormik(todo)(element.fields, { deepPath: path }),
			};
		}

		return todo(element, { path, index });
	});
};

export const getInitialValuesFromFields = (fields) => {
	return fields.reduce((acc, field) => (
		field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY
			? ({ ...acc, ...getInitialValuesFromFields(field.fields) })
			: ({ ...acc, [field.name]: field.value })
	), {});
};

export const getValidParams = (fields: AppFormField[]): FormikField[] => {
	const extendedFields = normalizeFieldsForFormik(extendElementWithRequiredKeys)(fields);

	return {
		fields: extendedFields,
		initialValues: getInitialValuesFromFields(extendedFields),
	};
}

export const setFieldValueByName = ({ element, formikValues = null }) => (
	formikValues === null
		? {}
		: {
			value: formikValues[element.name]
				? formikValues[element.name]
				: element.value,
			previousValue: (formikValues[element.name]
				? formikValues[element.name]
				: element.value) || (element.defaultValue || ''),
		}
);

export const setFieldEditable = ({ isEditing }) => ({ isEditing });

export const updateNestedFields = (params) => {
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
};

export const updateElement = (params) => ({
	...params.element,
	isNew: false,
	...setFieldEditable(params),
	...setFieldValueByName(params),
	...updateNestedFields(params),
});

export const updateFieldsDefinition = (params) => {
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
};

export const fieldsUtils = {
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

export const elementUtils = {
	getParentPath: (path) => {
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
	removeChildrenOrCurrent: (arr, field, isChildren = false) => {
		let updatedArr = [ ...arr ];

		if (isChildren) {
			updatedArr[field.index] = {
				...field,
				isEditing: false,
				fields: [],
			};
		} else {
			updatedArr.splice(field.index, 1);
		}

		return updatedArr;
	},
	resetFieldValueToPreviousValue: (arr, field) => {
		arr[field.index] = {
			...field,
			value: field.previousValue,
			isEditing: false,
			fields: field.fields.map((el) => ({ ...el, value: el.previousValue, isEditing: false })),
		};

		return arr;
	},
	setFieldValue: (field, newValue) => ({
		...field,
		value: newValue,
		previousValue: newValue || field.value || field.defaultValue || '',
	}),
	updateFieldsValues: (arr, formikValues) => {
		return arr.map((element) => {
			if (formikValues[element.name]) {
				return elementUtils.setFieldValue(element, formikValues[element.name]);
			}

			if (element.fields) {
				return {
					...element,
					fields: elementUtils.updateFieldsValues(element.fields, formikValues),
				};
			}

			return element;
		});
	},
};
