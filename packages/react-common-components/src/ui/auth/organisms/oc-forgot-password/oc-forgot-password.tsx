// commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { Link } from 'react-router-dom';

import { OcInputComponent, OcLabelComponent } from '../../../common';
import OcError from '../../../common/atoms/oc-error/oc-error';
import OcButtonComponent from '../../../common/atoms/oc-button';
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
							<h4 className="forgot-password__header-heading">Forgot Password?</h4>
							<OcLabelComponent>We will send you a link to reset your password</OcLabelComponent>
						</div>
						<div className="forgot-password__email">
							<span className="forgot-password__email-label">
								<OcLabelComponent htmlFor={inputProps?.id}>Email</OcLabelComponent>
							</span>
							<OcInputComponent
								inputType="text"
								placeholder="Email"
								customClass="forgot-password__email-input"
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
						>
							Reset Password
						</OcButtonComponent>
						<div className="forgot-password__log-in">
							<span>
								<OcLabelComponent>Already have an account?</OcLabelComponent>
							</span>
							<Link to={loginUrl} className="forgot-password__link">
								{' '}
								Log In
							</Link>
						</div>
					</>
				)}
				<div className="forgot-password__sign-up">
					<span>
						<OcLabelComponent>Dont have an account yet?</OcLabelComponent>
					</span>
					<Link to={signupUrl} className="forgot-password__link">
						{' '}
						Sign Up
					</Link>
				</div>
			</div>
			{/*</form>*/}
		</div>
	);
};

export default OcForgotPasswordComponent;
