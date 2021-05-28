// @ts-nocheck
import { AppFormField, FormikField } from './types';

export const extendFieldWithRequiredKeys = (field, name) => ({
	...field, name: name.replaceAll('.', '/'), value: field.defaultValue || '',
});

export const normalizeFieldsForFormik = (fields: AppFormField[], namespace: string) => {
	return fields.map((field) => {
		const name: string = namespace ? `${namespace}.fields.${field.id}` : field.id;

		if (field.type === 'dynamicFieldArray') {
			return {
				...extendFieldWithRequiredKeys(field, name),
				fields: normalizeFieldsForFormik(field.fields, name),
			};
		}

		return extendFieldWithRequiredKeys(field, name);
	});
};

export const getInitialValuesFromFields = (fields) => {
	return fields.reduce((acc, field) => (
		field.type === 'dynamicFieldArray'
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
