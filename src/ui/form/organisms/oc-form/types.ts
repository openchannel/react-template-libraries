import * as React from 'react';
import type { FieldInputProps, FormikProps } from 'formik';

import type { Dataset } from '../../../common';
import type { AppFormModel, FormikField, FormikFieldsValues } from '../../models';

export interface OcFormProps {
	formJsonData: AppFormModel;
	onSubmit: () => void;
	onCancel: () => void;
	/**
	 * Set position of the field label. Can be: 'top', 'left', 'right'.
	 * @param {('top'|'left'|'right')} position
	 * @default top
	 */
	labelPosition?: string;
	/**
	 * @default Submit
	 */
	successButtonText?: string;
	/**
	 * Set position of the field label. Can be: 'top', 'left', 'right'.
	 * @default left
	 */
	buttonPosition?: string;
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

export type normalizeFieldsForFormikParams = (
	// eslint-disable-next-line
	todo: Function,
) => (fields: FormikField[], deepPath?: string) => FormikField[];

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
