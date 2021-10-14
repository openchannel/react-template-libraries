import * as React from 'react';

import { InputProps } from '../../../common/atoms';

export interface OcForgotPasswordProps {
	/**
	 * Source image link.
	 */
	companyLogoUrl: string;
	/**
	 * Router path.
	 */
	loginUrl: string;
	/**
	 * Flag if result page is shown
	 */
	showResultPage: boolean;
	/**
	 * Source image link.
	 */
	forgotPasswordDoneUrl: string;
	/**
	 * Router path.
	 */
	signupUrl: string;
	/**
	 * State of submit button.
	 */
	process?: boolean;
	/**
	 * Additional input props.
	 */
	inputProps?: InputProps;

	inputError?: string | boolean;

	onSubmit?(event: React.SyntheticEvent): void;
}
