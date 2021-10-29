import * as React from 'react';

import { InputProps } from '../../../common/atoms';

export interface OcActivationProps {
	/**
	 * Source image link.
	 */
	companyLogoUrl: string;
	/**
	 * Router path.
	 */
	resendActivationUrl: string;
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

	handleButtonClick?(event: React.SyntheticEvent): void;

	inputError?: string | boolean;
}
