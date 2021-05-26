import update from 'lodash/update';
import flattenDeep from 'lodash/flattenDeep';

import { AppFormField, FormikField } from './types';

// export const getInitialValues = (fields: AppFormField[], namespace: string): FormikField[] => {
// 	let fieldsObject = {};
//
// 	if (Array.isArray(fields)) {
// 		fieldsObject = fields.reduce((acc, item) => ({ ...acc, [item.id]: item }), {})
// 	}
//
// 	return Object.values(fieldsObject).reduce((prev: FormikField[], curr: any) => {
// 		// const name: string = namespace ? `${namespace}.fields.${curr.id}` : curr.id;
//
// 		if (curr.type === 'dynamicFieldArray') {
// 			prev = {
// 				...prev,
// 				// ...getInitialValues(curr.fields, name),
// 				...getInitialValues(curr.fields),
// 			};
// 		} else {
// 			prev[curr.id] = curr.defaultValue;
// 		}
//
// 		return prev;
// 	}, {} as any);
// }

export const addKeys = (field, name) => {
	return { ...field, name, value: field.defaultValue }
}

export const createNameValue = (field) => {
	return { [field.name]: field.value }
}

export const transform = (fields, namespace) => {
	return flattenDeep(fields.map((item) => {
		const name: string = namespace ? `${namespace}.fields.${item.id}` : item.id;

		if (item.type === 'dynamicFieldArray') {
			return transform(item.fields, name)
		}
		return {
			...item,
			...addKeys(item, name),
		}
	}))
}

export const getInitialValues = (fields: AppFormField[]): FormikField[] => {

	const initialValues = transform(fields).reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {});

	return {
		initialValues
	}
}
