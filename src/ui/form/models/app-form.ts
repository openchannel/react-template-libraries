import { FormikValues } from 'formik';

export interface FormikField extends AppFormField {
	index: number;
	path: string;
	staticId: string;
	name: string;
	value: any;
	previousValue: any;
	isEditing: boolean;
	isNew: boolean;
}

export type FormikFieldsValues = null | FormikValues;

export interface AppFormField {
	id: string;
	label: string;
	description?: string;
	defaultValue: any;
	type: string;
	required?: any;
	attributes?: AppFormFieldAttributes;
	options?: any;
	subFieldDefinitions?: AppFormField[];
	fields?: FormikField[];
	placeholder?: string;
	category?: string;
}

export interface AppFormModel {
	formId?: string;
	name?: string;
	createdDate?: number;
	fields?: AppFormField[];
}

export interface AppFormFieldAttributes extends Record<string, any> {
	maxCount?: number;
	minCount?: number;
	required?: boolean;
	maxChars?: number;
	minChars?: number;
	min?: number;
	max?: number;
	ordering?: 'append' | 'prepend';
	rowLabel?: string;
}

type ValidationErrors = {
	[key: string]: any;
};

export interface ValidatorFn {
	(value: any): ValidationErrors | null;
}

export type FieldValidators = { [k: string]: ValidatorFn[] };
