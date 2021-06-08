import { FormikValues } from 'formik';

import { AppFormField } from '../../models';

export const getFieldLabel = (
	element: AppFormField,
	formikValues: unknown,
	index: number,
): string => {
	if (!element.fields) return `Item ${index + 1}`;

	const rowLabel = element.fields.find(f => f.id === element.attributes?.rowLabel);
	if (!rowLabel) return `Item ${index + 1}`;

	const item: string[] | undefined = Object.entries(formikValues)
	.find(([key, value]) => {
		if (element?.attributes?.rowLabel && key.includes(element.attributes.rowLabel)) {
			return value;
		}
		return null
	});

	return item ? item[1] : `Item ${index + 1}`;
};
