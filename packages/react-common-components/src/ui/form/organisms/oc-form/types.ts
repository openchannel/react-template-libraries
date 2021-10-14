import * as React from 'react';
import type { FieldInputProps, FormikHelpers, FormikProps } from 'formik';

import type { Dataset } from '../../../common';
import type { AppFormModel, FormikField, FormikFieldsValues } from '../../models';

export type OcFormValues = Record<string, any>;
export type OcFormFormikHelpers = FormikHelpers<Record<string, unknown>>;

export interface OcFormProps extends FormikServiceProps {
	formJsonData: AppFormModel;
	onSubmit: (
		values: OcFormValues,
		formikHelpers: OcFormFormikHelpers,
	) => void;
	onCancel?: () => void;
	/**
	 * Set position of the field label.
	 * @param {('top'|'left'|'right')} position
	 * @default top
	 */
	labelPosition?: 'top' | 'left' | 'right';
	/**
	 * @default Submit
	 */
	successButtonText?: string;
	/**
	 * Set position of the field label.
	 * @default left
	 */
	buttonPosition?: 'top' | 'left' | 'right' | 'between';
}

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

export interface OcFormContextProviderProps {
	initialValue: {
		flattenFields: FormikField[];
		fieldsDefinition: FormikField[];
		updateState: (normalizedFields: FormikField[]) => void;
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

export interface FormikServiceProps {
	/**
	 * Service to make API calls.
	 */
	service?: any
}

export interface FormikMapFieldsProps extends FormikServiceProps {
	fields: FormikField[];
}

export interface FormikComponentWrapperProps<Value> {
	field: FieldInputProps<Value>;
	form: FormikProps<FormikFieldsValues>;
	customClass?: string;
}

export type FCWP<Value> = FormikComponentWrapperProps<Value>;

export interface FieldGroupProps {
	description?: string;
	label?: string;
	labelFor?: string;
	name: string;
	required?: boolean;
}
