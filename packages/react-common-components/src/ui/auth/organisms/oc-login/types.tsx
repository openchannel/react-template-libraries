import * as React from 'react';
import { FormikHelpers } from 'formik';

export interface LoginProps {
	/**
	 * function that is called on form submit
	 */
	handleSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<void>;
	/**
	 * forgot password url
	 */
	forgotPwdUrl?: string;
	/**
	 * Sign up url.
	 */
	signupUrl?: string;
	/**
	 * company logo image Url
	 */
	companyLogoUrl?: string;
	/**
	 * login button text
	 */
	loginButtonText?: string;
	/**
	 * click handler on 'forgot password'
	 */
	onActivationLinkClick?(email: string): void;

	/**
	 * Error html template for {@link incorrectEmailErrorCode}.
	 */
	incorrectEmailErrorCodeTemplate?: React.ReactNode;

	/**
	 * Error html template for {@link notVerifiedEmailErrorCode}.
	 */
	notVerifiedEmailErrorTemplate?: React.ReactNode;

	/**
	 * Error html template for {@link passwordResetRequiredErrorCode}.
	 */
	passwordResetRequiredErrorTemplate?: React.ReactNode;

	/**formik initial values */
	inputEmailValue?: string;
	inputPasswordValue?: string;
	isIncorrectEmail?: boolean;
	isUnverifiedEmail?: boolean;
	isPasswordResetRequired?: boolean;
}
