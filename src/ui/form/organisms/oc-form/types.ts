// export const fieldTypeValues = [
// 	'richText', 'text', 'longText', 'dropdownList', 'tags', 'singleFile',
// 	'multiple', 'multiImage', 'singleImage', 'privateSingleFile', 'multiPrivateFile', 'number',
// 	'checkbox', 'emailAddress', 'websiteUrl', 'color', 'booleanTags', 'numberTags', 'videoUrl',
// 	'date', 'datetime', 'multiselectList', 'dynamicFieldArray', 'password',
// ]
// export type FieldType = typeof fieldTypeValues;

export type FieldType = 'richText' | 'text' | 'longText' | 'dropdownList' | 'tags' | 'singleFile' |
	'multiple' | 'multiImage' | 'singleImage' | 'privateSingleFile' | 'multiPrivateFile' | 'number' |
	'checkbox' | 'emailAddress' | 'websiteUrl' | 'color' | 'booleanTags' | 'numberTags' | 'videoUrl' |
	'date' | 'datetime' | 'multiselectList' | 'dynamicFieldArray' | 'password';

export interface AppFormFieldAttributes {
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

export interface AppFormField {
	id: string;
	label: string;
	description?: string;
	defaultValue: any;
	type: FieldType;
	required?: any;
	attributes?: AppFormFieldAttributes;
	options?: any;
	subFieldDefinitions?: AppFormField [];
	fields?: AppFormField[];
	placeholder?: string;
	category?: string;
}

export interface FormikField extends AppFormField {
	name: string;
	value: any;
}

export interface AppFormModel {
	formId?: string;
	name?: string;
	createdDate?: number;
	fields?: AppFormField[];
}

