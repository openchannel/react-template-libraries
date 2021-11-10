import { InputProps } from '../../../common/atoms';
import * as React from "react";

export interface OcResendProps {
	/**
	 * Source image link.
	 */
	companyLogoUrl: string;
	/**
	 * Router path.
	 */
	signupUrl: string;
	/**
	 * Router path.
	 */
	loginUrl: string;
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
