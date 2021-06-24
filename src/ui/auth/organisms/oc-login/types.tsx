export interface LoginProps {
	/**
	 * function that is called on form submit
	 */
	handleSubmit: (values: any) => void;
	/**
	 * Router path.
	 */
	sendActivationLink?: string;
	/**
	 * handler function called on onChange
	 */
	onChange?: () => void;
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
	 * is submit process running - boolean
	 */
	process?: boolean;
	/**
	 * click handler on 'forgot password'
	 */
	onActivationLinkClick?: () => void;

	/**formik initial values */
	inputEmailValue?: string;
	inputPasswordValue?: string;
}
