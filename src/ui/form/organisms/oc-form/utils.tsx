// @ts-nocheck
import { FIELD_TYPE } from '../../lib';
import { AppFormField, FormikField } from './types';

export const extendFieldWithRequiredKeys = (field, { name, path, index }) => ({
	...field,
	index,
	path,
	name: name.replaceAll('.', '/'),
	value: field.defaultValue || '',
	isEditing: true,
	isNew: false,
});

export const normalizeFieldsForFormik = (fields: AppFormField[], { namespace, deepPath } = {}) => {
	return fields.map((field, index) => {
		const name: string = namespace ? `${namespace}.fields.${field.id}` : field.id;
		const path: string = deepPath ? `${deepPath}.fields.${index}` : `${index}`;

		if (field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			return {
				...extendFieldWithRequiredKeys(field, { name, path, index }),
				fields: normalizeFieldsForFormik(field.fields, { namespace: name, deepPath: path }),
			};
		}

		return extendFieldWithRequiredKeys(field, { name, path, index });
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
	const extendedFields = normalizeFieldsForFormik(fields);

	return {
		fields: extendedFields,
		initialValues: getInitialValuesFromFields(extendedFields),
	};
}
