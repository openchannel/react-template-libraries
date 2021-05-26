// commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { Link } from 'react-router-dom';

import {
	OcButtonComponent,
	OcError,
	OcInputComponent,
	OcLabelComponent,
} from '../../../../ui/common';

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
		<div className="activation login-card login-card_borders">
			{/*<form noValidate>*/}
			<div className="activation__card-body">
				<div className="activation__logo">
					<img src={companyLogoUrl} className="activation__logo-img company-logo" alt="logo" />
				</div>
				{showResultPage ? (
					<div className="forgot-password__header forgot-password__header-result">
						<img src={forgotPasswordDoneUrl} alt="done" />
						<h4 className="forgot-password__header-result-heading">Done!</h4>
						<span className="forgot-password__header-result-label">
							If your email address exists in out database, you will receive a password recovery
							link at your email address in a few minutes.
						</span>
					</div>
				) : (
					<>
						<div className="activation__header">
							<h4 className="activation__header-heading">Forgot Password?</h4>
							<OcLabelComponent>We will send you a link to reset your password</OcLabelComponent>
						</div>
						<div className="activation__form-group">
							<span className="activation__form-group-label">
								<OcLabelComponent htmlFor={inputProps?.id}>Email</OcLabelComponent>
							</span>
							<OcInputComponent
								inputType="text"
								placeholder="Email"
								customClass="activation__form-group-input"
								required
								{...inputProps}
							/>
							{inputError && <OcError message={String(inputError)} />}
						</div>
						<OcButtonComponent
							htmlType="submit"
							type="primary"
							customClass="activation__button"
							process={process}
						>
							Reset Password
						</OcButtonComponent>
						<div className="activation__reactivation">
							<span className="activation__reactivation-label">
								<OcLabelComponent>Already have an account?</OcLabelComponent>
							</span>
							<Link to={loginUrl} className="activation__link">
								{' '}
								Log In
							</Link>
						</div>
					</>
				)}
				<div className="activation__sign-up">
					<span className="activation__reactivation-label">
						<OcLabelComponent>Dont have an account yet?</OcLabelComponent>
					</span>
					<Link to={signupUrl} className="activation__link">
						{' '}
						Sign Up
					</Link>
				</div>
			</div>
			{/*</form>*/}
		</div>
	);
};
