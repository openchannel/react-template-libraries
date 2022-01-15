import * as React from 'react';

import type { AppFormField } from '../../../form/models';
import { OcFormFormikHelpers, OcFormValues } from '../../../form/organisms/oc-single-form';

export interface TypeModel<T extends TypeFieldModel> {
	formId?: string;
	fields?: T[];
}

export interface TypeFieldModel {
	placeholder?: string;
	name?: string;
	description?: string;
	id: string;
	type: string;
	label?: string;
	defaultValue?: any;
	attributes?: any;
	options?: OptionValue[] | string[];
	fields?: AppFormField[];
}

export interface OptionValue {
	value: any;
}

export interface OcEditUserFormConfig {
	name: string;
	account: OcEditUserTypeConfig;
	organization?: OcEditUserTypeConfig;
	fieldsOrder?: string[];
}

export interface OcEditUserTypeConfig {
	type: string;
	includeFields?: string[];
	typeData: TypeModel<TypeFieldModel>;
}

export interface OcEditUserResult {
	account?: OCOrganization;
	organization?: OCOrganization;
	password?: string;
}

export interface OCOrganization {
	name?: string;
	username?: string;
	type?: string;
	email: string;
	customData?: any;
}

export interface EditUserComponentProps {
	/**
	 * Configuration for Edit User form.
	 */
	formConfigs: OcEditUserFormConfig[];
	/**
	 * A callback fired when the Submit is clicked.
	 */
	onSubmit(values: OcFormValues, formikHelpers: OcFormFormikHelpers): void;
	/**
	 * Default text for the type label.
	 */
	defaultFormType?: string;
	/**
	 * Text of the form type label.
	 * @default 'Type'
	 */
	defaultTypeLabelText?: string;
	/**
	 * Custom error template what will be shown when no {@link #formConfigs} is provided or not provided correctly.
	 * @default null
	 */
	defaultEmptyConfigsErrorTemplate?: React.ReactNode;
	/**
	 * Error message what will be shown when no {@link #formConfigs} is provided or not provided correctly.
	 * This message will be shown only when the {@link #defaultEmptyConfigsErrorTemplate} not set.
	 * @default 'There are no forms configured'
	 */
	defaultEmptyConfigsErrorMessage?: string;

	submitButtonText?: string;

	customSubmitClass?: string;

	customCancelClass?: string;
}
