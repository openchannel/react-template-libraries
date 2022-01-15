import { FormikField, FormikFieldsValues } from '../../models';
import {
	setFieldEditable,
	setFieldValueByName,
	updateNestedFields,
} from '../oc-single-form/utils/fields';

export const updateElement = (params: {
	element: FormikField;
	formikValues?: FormikFieldsValues;
	isEditing: boolean;
}) => ({
	...params.element,
	isNew: false,
	...setFieldEditable(params),
	...setFieldValueByName(params),
	...updateNestedFields(params),
});

export const updateFieldsDefinition = (params: {
	fields: FormikField[];
	formikValues?: FormikFieldsValues;
	fieldName: string;
	isEditing: boolean;
}): FormikField[] => {
	return params.fields.map((element) => {
		if (element.name === params.fieldName) {
			return updateElement({
				element,
				formikValues: params.formikValues,
				isEditing: params.isEditing,
			});
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition({ ...params, fields: element.fields }),
			};
		}

		return element;
	});
};
