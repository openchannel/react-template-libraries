// export const fieldTypeValues = [
// 	'richText', 'text', 'longText', 'dropdownList', 'tags', 'singleFile',
// 	'multiple', 'multiImage', 'singleImage', 'privateSingleFile', 'multiPrivateFile', 'number',
// 	'checkbox', 'emailAddress', 'websiteUrl', 'color', 'booleanTags', 'numberTags', 'videoUrl',
// 	'date', 'datetime', 'multiselectList', 'dynamicFieldArray', 'password',
// ]
// export type FieldType = typeof fieldTypeValues;

import * as React from 'react';
import { FieldInputProps, FormikProps } from 'formik';

import { Dataset } from '../../../common';
import { AppFormModel, FormikField, FormikFieldsValues } from '../../models';

export type FieldType =
	| 'richText'
	| 'text'
	| 'longText'
	| 'dropdownList'
	| 'tags'
	| 'singleFile'
	| 'multiple'
	| 'multiImage'
	| 'singleImage'
	| 'privateSingleFile'
	| 'multiPrivateFile'
	| 'number'
	| 'checkbox'
	| 'emailAddress'
	| 'websiteUrl'
	| 'color'
	| 'booleanTags'
	| 'numberTags'
	| 'videoUrl'
	| 'date'
	| 'datetime'
	| 'multiselectList'
	| 'dynamicFieldArray'
	| 'password';

export type normalizeFieldsForFormikParams = (
	// eslint-disable-next-line
	todo: Function,
) => (fields: FormikField[], deepPath?: string) => FormikField[];

export interface OcFormContextProviderProps {
	initialValue: {
		data: AppFormModel;
		setValidators: (validation: any) => void;
	};
}

export interface OcFormContextProps {
	fields: FormikField[];
	onAddDynamicField: React.MouseEventHandler;
	onRemoveDynamicField: (event: React.SyntheticEvent<Dataset>) => void;
	onStartEditingField: (event: React.SyntheticEvent<Dataset>) => void;
	onCancelEditingField: React.MouseEventHandler;
	onSaveField: React.MouseEventHandler;
}

export interface FormikMapFieldsProps {
	fields: FormikField[];
}

export interface FormikComponentWrapperProps<Value> {
	field: FieldInputProps<Value>;
	form: FormikProps<FormikFieldsValues>;
}

export type FCWP<Value> = FormikComponentWrapperProps<Value>;

export interface FieldGroupProps {
	description?: string;
	label?: string;
	labelFor?: string;
	name: string;
	required?: boolean;
}
