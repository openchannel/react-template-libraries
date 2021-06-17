import { PasswordProps } from '../../../../ui/common/atoms';

export interface OcResetPasswordProps {
	/**
	 * Source image link.
	 */
	companyLogoUrl: string;
	/**
	 * Router path.
	 */
	loginUrl: string;
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
	inputProps?: PasswordProps;

	inputError?: string | boolean;
	value?: any;
	onChange?: any;
	customClass: string;
	handleButtonClick?: any;
	validationError: boolean;
}
