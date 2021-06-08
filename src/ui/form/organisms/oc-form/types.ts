// export const fieldTypeValues = [
// 	'richText', 'text', 'longText', 'dropdownList', 'tags', 'singleFile',
// 	'multiple', 'multiImage', 'singleImage', 'privateSingleFile', 'multiPrivateFile', 'number',
// 	'checkbox', 'emailAddress', 'websiteUrl', 'color', 'booleanTags', 'numberTags', 'videoUrl',
// 	'date', 'datetime', 'multiselectList', 'dynamicFieldArray', 'password',
// ]
// export type FieldType = typeof fieldTypeValues;

import * as React from 'react';
import { Dataset } from '../../../common/atoms/oc-button';
import { AppFormModel, FormikField } from '../../models';

export type FieldType = 'richText' | 'text' | 'longText' | 'dropdownList' | 'tags' | 'singleFile' |
	'multiple' | 'multiImage' | 'singleImage' | 'privateSingleFile' | 'multiPrivateFile' | 'number' |
	'checkbox' | 'emailAddress' | 'websiteUrl' | 'color' | 'booleanTags' | 'numberTags' | 'videoUrl' |
	'date' | 'datetime' | 'multiselectList' | 'dynamicFieldArray' | 'password';

export type normalizeFieldsForFormikParams = (todo: Function) =>
	(fields: FormikField[], deepPath?: string) => FormikField[]

export interface OcFormContextProviderProps {
	initialValue: {
		data: AppFormModel;
	};
}

export interface OcFormContextProps {
	fields: FormikField[];
	onAddDynamicField: (event: React.SyntheticEvent<Dataset>) => void;
	onRemoveDynamicField: (event: React.SyntheticEvent<Dataset>) => void;
	onStartEditingField: (event: React.SyntheticEvent<Dataset>) => void;
	onCancelEditingField: (event: React.SyntheticEvent<Dataset>) => void;
	onSaveField: (event: React.SyntheticEvent<Dataset>) => void;
}

export interface FormikMapFieldsProps {
	fields: FormikField[];
}
