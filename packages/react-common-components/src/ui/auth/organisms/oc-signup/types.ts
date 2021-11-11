import * as React from 'react';

import type { OcFormFormikHelpers, OcFormValues } from '../../../form/organisms/oc-form';
import type { OcEditUserFormConfig } from '../oc-edit-user-form';

export interface SignupProps {
	/**
	 * Config for the Custom Sign Up form.
	 */
	formConfigs: OcEditUserFormConfig[];
	onSubmit(values: OcFormValues, formikHelpers: OcFormFormikHelpers): void;
	/**
	 * A source path to company logo icon.
	 * @type {string}.
	 */
	companyLogoUrl?: string;
	/**
	 * Login url for those users who already has an account.
	 */
	loginUrl?: string;
	/**
	 * A variable which determines whether to show or hide signup feedback page.
	 * @default false
	 */
	showFeedback?: boolean;
	/**
	 * A source path to the icon in a result message after the activation email had been sent to the inbox.
	 */
	forgotPasswordDoneUrl?: string;
	/**
	 * fire a callback when 'Active account' is clicked
	 */
	goToActivationPage?(): void;
	/**
	 * Default text for the type label.
	 */
	defaultTypeLabelText?: string;
	/**
	 * Show custom 'terms' checkbox
	 */
	enableTermsCheckbox?: boolean;
	/**
	 * Custom template for the checkbox with privacy and terms.
	 */
	customTermsDescription?: React.ReactNode;
	/**
	 * Content of the custom 'terms' checkbox label
	 */
	ordinaryTermsDescription?: React.ReactNode;

	defaultEmptyConfigsErrorMessage?: string;

	enablePasswordField?: boolean;
}
