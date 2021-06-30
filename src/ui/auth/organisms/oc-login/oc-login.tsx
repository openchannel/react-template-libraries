// commit 8042d87b78e1a50f433116e39cb0a61c0a457b9f Author: Julia Date: 26.02.21, 19:40
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { OcButtonComponent, OcCheckboxComponent, OcLabelComponent } from '../../../../ui/common';
import { FormikInputEmail, FormikInputPassword } from './oc-login-inputs';

import { LoginProps } from './types';
import './style.scss';

export const OcLoginComponent: React.FC<LoginProps> = (props) => {
	const {
		handleSubmit,
		companyLogoUrl = '../../../../assets/img/logo-company.png',
		forgotPwdUrl,
		loginButtonText = 'Log In',
		signupUrl,
		inputEmailValue,
		inputPasswordValue,
		isIncorrectEmail,
		isUnverifiedEmail,
	} = props;

	const validateEmail = (value: string) => {
		let error;
		if (!value) {
			error = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
			error = 'Invalid email address';
		}
		return error;
	};
	const validatePassword = (value: string) => {
		let error;
		if (!value) {
			error = 'Required';
		}
		return error;
	};

	return (
		<div className="login login-card login-card_borders">
			<Formik
				initialValues={{
					email: inputEmailValue || '',
					password: inputPasswordValue || '',
				}}
				onSubmit={handleSubmit}
			>
				{({ handleSubmit, handleChange, isSubmitting }) => (
					<Form onSubmit={handleSubmit} noValidate>
						<div className="login__card-body">
							<div className="login__logo">
								<img alt="logo" className="img-fluid company-logo" src={companyLogoUrl || ''} />
							</div>
							<div className="login__header">
								<h4 className="login__header-heading">Log In</h4>
								<OcLabelComponent
									text="Log in into your account"
									className="login__header-invitation"
								/>
							</div>
							{isIncorrectEmail && (
								<div className="login__error">
									The email and password you have provided is incorrect.
								</div>
							)}
							{isUnverifiedEmail && (
								<div className="login__error">
									This account has not been activated yet. <br />
									Please check your inbox for an activation email or{' '}
									<Link className="font-s font-med resend-link" to="/">
										resend the activation email
									</Link>
								</div>
							)}
							<FormikInputEmail name="email" validate={validateEmail} handleChange={handleChange} />
							<FormikInputPassword
								name="password"
								handleChange={handleChange}
								validate={validatePassword}
							/>
							<div className="login__forgot-block">
								<div className="remember">
									<OcCheckboxComponent type="checkbox" labelText="Remember Me" />
								</div>
								{forgotPwdUrl && (
									<div className="forgot">
										<Link className="forgot__link" to={forgotPwdUrl || '/'}>
											Forgot password?{' '}
										</Link>
									</div>
								)}
							</div>
							<OcButtonComponent
								htmlType="submit"
								process={isSubmitting}
								text={loginButtonText}
								type="primary"
								customClass="login__button"
							/>
							{signupUrl && (
								<div className="login__sign-up">
									Dont have an account yet?{' '}
									<Link className="login__sign-up-link" to={signupUrl || '/'}>
										Sign Up
									</Link>
								</div>
							)}
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
