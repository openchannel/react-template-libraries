import { isEmpty } from 'lodash';
import { AppFormField, FormikFieldsValues } from '../../models';

export const getFieldLabel = (
	element: AppFormField,
	formikValues: FormikFieldsValues,
	index: number,
): string => {
	if (!element.fields || formikValues === null) return `Item ${index + 1}`;

	const rowLabel = element.fields.find((f) => f.id === element.attributes?.rowLabel);
	if (!rowLabel) return `Item ${index + 1}`;
	
	const item = Object.entries(formikValues).filter(([key, value]) => {
		if (element?.attributes?.rowLabel && key.includes(element.attributes.rowLabel)) {
			return value;
		}
	});

	return !isEmpty(item[index]) ? item[index][1] : `Item ${index + 1}`;
};
