// commit 3b100c903443f29e25495ad52a8169a736978274 Author: Julia Date: 26.02.21, 20:13
import * as React from 'react';
import { Link } from 'react-router-dom';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcError from '../../../common/atoms/oc-error/oc-error';
import OcInputComponent from '../../../common/atoms/oc-input/oc-input';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';

import { OcResendProps } from './types';

import './styles.scss';

export const OcResendActivation: React.FC<OcResendProps> = (props) => {
	const { companyLogoUrl, signupUrl, loginUrl, process, inputProps, inputError } = props;

	return (
		<div className="resend-activation login-card login-card_borders">
			{/*<form noValidate>*/}
			<div className="resend-activation__card-body">
				<div className="resend-activation__logo">
					<img src={companyLogoUrl} className="company-logo" alt="logo" />
				</div>
				<div className="resend-activation__header">
					<h4 className="resend-activation__header-heading">Resend activation code</h4>
					<OcLabelComponent>Resend the activation code to your email</OcLabelComponent>
				</div>
				<div className="resend-activation__email-group">
					<span className="resend-activation__email-group-label">
						<OcLabelComponent htmlFor={inputProps?.id}>Email</OcLabelComponent>
					</span>
					<OcInputComponent
						placeholder="Email"
						inputType="email"
						customClass={`resend-activation__email-group-input ${inputError ? 'invalid' : ''}`}
						required
						{...inputProps}
					/>
					{inputError && <OcError message={String(inputError)} />}
				</div>
				<OcButtonComponent
					htmlType="submit"
					type="primary"
					customClass="resend-activation__button"
					process={process}
					onClick={inputProps?.onChange}
				>
					Resend
				</OcButtonComponent>
				<div className="resend-activation__log-in">
					<OcLabelComponent>Already have an account?</OcLabelComponent>
					<Link to={loginUrl} className="resend-activation__link">
						{' '}
						Log In
					</Link>
				</div>
				<div className="resend-activation__sign-up">
					<OcLabelComponent>Dont have an account yet?</OcLabelComponent>
					<Link to={signupUrl} className="resend-activation__link">
						{' '}
						Sign Up
					</Link>
				</div>
			</div>
			{/*</form>*/}
		</div>
	);
};
export default OcResendActivation;
