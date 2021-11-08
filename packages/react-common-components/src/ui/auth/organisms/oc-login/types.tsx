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

	/**formik initial values */
	inputEmailValue?: string;
	inputPasswordValue?: string;

	/**
	 * Display incorrect email error
	 */
	isIncorrectEmail?: boolean;

	/**
	 * Display unverified email error
	 */
	isUnverifiedEmail?: boolean;

	/**
	 * Display message with activation account link
	 */
	isPasswordResetRequired?: boolean;

	/**
	 * Custom ReactNode element to display error for isIncorrectEmail.
	 */
	incorrectEmailErrorCodeTemplate?: React.ReactNode;

	/**
	 * Custom ReactNode element to display error for isUnverifiedEmail.
	 */
	notVerifiedEmailErrorTemplate?: React.ReactNode;

	/**
	 * Custom ReactNode element to display error for isPasswordResetRequired.
	 */
	passwordResetRequiredErrorTemplate?: React.ReactNode;
}
