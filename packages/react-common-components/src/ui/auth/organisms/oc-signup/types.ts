import * as React from 'react';

import type { OcFormValues, OcFormFormikHelpers } from '../../../form/organisms/oc-form';
import type { OcEditUserFormConfig } from '../oc-edit-user-form';

export interface SignupProps {
	formConfigs: OcEditUserFormConfig[];
	onSubmit(values: OcFormValues, formikHelpers: OcFormFormikHelpers): void;
	/**
	 * Image source url
	 */
	companyLogoUrl?: string;
	/**
	 * Show link to the Log in page.
	 */
	loginUrl?: string;
	/**
	 * Show message after successful sign up
	 */
	showSignupFeedbackPage?: boolean;
	/**
	 * Image source url
	 */
	forgotPasswordDoneUrl?: string;
	/**
	 * fire a callback when 'Active account' is clicked
	 */
	goToActivationPage?(): void;
	/**
	 * Show Types dropdown to select form config
	 */
	enableTypesDropdown?: boolean;
	/**
	 * Label for the Types dropdown
	 */
	defaultTypeLabelText?: string;
	/**
	 * Show custom 'terms' checkbox
	 */
	enableTermsCheckbox?: boolean;
	/**
	 * Content for the custom 'terms' checkbox
	 */
	customTermsDescription?: React.ReactNode;
	/**
	 * Content of the custom 'terms' checkbox label
	 */
	ordinaryTermsDescription?: React.ReactNode;
	defaultEmptyConfigsErrorMessage?: string;
	enablePasswordField?: boolean;
}
