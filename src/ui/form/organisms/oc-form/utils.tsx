// @ts-nocheck
import { nanoid } from 'nanoid';

import { FIELD_TYPE } from '../../lib';
import { AppFormField, FormikField } from './types';

export const extendElementWithRequiredKeys = (element, { path, index }) => ({
	...element,
	index,
	path,
	name: `${element.id}-${nanoid()}`,
	value: element.defaultValue || '',
	isEditing: true,
	isNew: false,
});

export const updateElementKeys = (element, { path, index }) => ({
	...element,
	index,
	path,
	value: element.defaultValue,
	isEditing: true,
	isNew: false,
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
}

export const getValidParams = (fields: AppFormField[]): FormikField[] => {
	const extendedFields = normalizeFieldsForFormik(extendElementWithRequiredKeys)(fields);

	return {
		fields: extendedFields,
		initialValues: getInitialValuesFromFields(extendedFields),
	};
}
