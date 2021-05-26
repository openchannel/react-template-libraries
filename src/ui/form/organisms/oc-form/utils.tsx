import { AppFormField, FormikField } from './types';

export const getInitialValues = (fields: AppFormField[]): FormikField[] => {
	return fields.reduce((prev: FormikField[], curr: any) => {
		if (curr.type === 'dynamicFieldArray') {
			curr.fields = getInitialValues(curr.fields);
		} else {
			curr.name = curr.id;
			curr.value = curr.defaultValue;
		}
		prev.push(curr);

		return prev;
	}, [] as FormikField[]);
}
