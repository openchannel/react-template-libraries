import { FormikField } from './app-form';

export interface FieldValueModel {
	fieldId: string;
	fieldValue: any;
}

export interface PreviewFieldModel extends FormikField {
	isValidField: boolean;
	fieldValue: any;
	formArrayDFA: any;
	groupFieldIndex?: number;
}
