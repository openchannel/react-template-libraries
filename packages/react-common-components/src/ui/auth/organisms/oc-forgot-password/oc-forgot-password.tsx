// commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { Link } from 'react-router-dom';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcError from '../../../common/atoms/oc-error/oc-error';
import OcInputComponent from '../../../common/atoms/oc-input/oc-input';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';

import { OcForgotPasswordProps } from './types';

import './style.scss';

export const OcForgotPasswordComponent: React.FC<OcForgotPasswordProps> = (props) => {
	const {
		companyLogoUrl,
		forgotPasswordDoneUrl,
		showResultPage,
		signupUrl,
		loginUrl,
		process,
		inputProps,
		inputError,
		onSubmit,
	} = props;

	return (
		<div className="forgot-password login-card login-card_borders">
			{/*<form noValidate>*/}
			<div className="forgot-password__card-body">
				<div className="forgot-password__logo">
					<img src={companyLogoUrl} className="forgot-password__logo-img company-logo" alt="logo" />
				</div>
				{showResultPage ? (
					<div className="forgot-password__header forgot-password__header-result">
						<img src={forgotPasswordDoneUrl} alt="done" />
						<h4 className="forgot-password__header-result-heading">Done!</h4>
						<span className="forgot-password__header-result-label">
							If your email address exists in our database, you will receive a password recovery
							link at your email address in a few minutes.
						</span>
					</div>
				) : (
					<>
						<div className="forgot-password__header">
							<h4 className="forgot-password__header-heading">Forgot password?</h4>
							<OcLabelComponent>We will send you a link to reset your password</OcLabelComponent>
						</div>
						<div className="forgot-password__email">
							<span className="forgot-password__email-label">
								<OcLabelComponent htmlFor={inputProps?.id}>Email</OcLabelComponent>
							</span>
							<OcInputComponent
								inputType="text"
								placeholder="Email"
								customClass={`forgot-password__email-input ${inputError ? 'invalid' : ''}`}
								required
								{...inputProps}
							/>
							{inputError && <OcError message={String(inputError)} />}
						</div>
						<OcButtonComponent
							htmlType="submit"
							type="primary"
							customClass="forgot-password__button"
							process={process}
							onClick={onSubmit}
						>
							Reset password
						</OcButtonComponent>
						<div className="forgot-password__log-in">
							<span>
								<OcLabelComponent>Already have an account?</OcLabelComponent>
							</span>
							<Link to={loginUrl} className="forgot-password__link">
								{' '}
								Log in
							</Link>
						</div>
					</>
				)}
				<div className="forgot-password__sign-up">
					<span>
						<OcLabelComponent>Don't have an account yet?</OcLabelComponent>
					</span>
					<Link to={signupUrl} className="forgot-password__link">
						{' '}
						Sign up
					</Link>
				</div>
			</div>
			{/*</form>*/}
		</div>
	);
};

export default OcForgotPasswordComponent;
