// commit 8042d87b78e1a50f433116e39cb0a61c0a457b9f Author: Julia Date: 26.02.21, 19:40
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Form, Formik } from 'formik';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcCheckboxComponent from '../../../common/atoms/oc-checkbox/oc-checkbox';
import OcError from '../../../common/atoms/oc-error/oc-error';
import OcInputComponent from '../../../common/atoms/oc-input/oc-input';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';
import OcPasswordComponent from '../../../common/atoms/oc-password/oc-password';

import { LoginProps } from './types';
import { onActivationLinkClick, validateLogin } from './utils';

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

	return (
		<div className="login login-card login-card_borders">
			<Formik
				initialValues={{
					email: inputEmailValue || '',
					password: inputPasswordValue || '',
					remember: false,
				}}
				onSubmit={handleSubmit}
				validate={validateLogin}
			>
				{({ handleSubmit, handleChange, isSubmitting, errors, values, touched, handleBlur }) => (
					<Form onSubmit={handleSubmit} noValidate>
						<div className="login__card-body">
							<div className="login__logo">
								<img alt="logo" className="img-fluid company-logo" src={companyLogoUrl || ''} />
							</div>
							<div className="login__header">
								<h4 className="login__header-heading">Log In</h4>
								<OcLabelComponent
									text="Log in into your account"
									customClass="login__header-invitation"
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
									<button
										className="font-s font-med resend-link"
										onClick={() => onActivationLinkClick(values.email || '/')}
									>
										resend the activation email
									</button>
								</div>
							)}
							<div className="login__email login__email_margin_top">
								<OcLabelComponent
									htmlFor="login_email"
									text="Email"
									customClass="login__form-label login__email-label"
								/>
								<OcInputComponent
									placeholder="Email"
									name="email"
									required
									id="login_email"
									onChange={handleChange}
									value={values.email}
									onBlur={handleBlur}
									customClass={`login__email-input ${errors.email ? 'invalid' : ''}`}
								/>
								{errors.email && <OcError message={errors.email} />}
							</div>
							<div className="login__password">
								<OcLabelComponent
									htmlFor="login_password"
									text="Password"
									customClass="login__form-label login__password-label"
								/>
								<OcPasswordComponent
									name="password"
									placeholder="Password"
									customClass={`login__password-input ${errors.password ? 'invalid' : ''}`}
									id="login_password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									required
								/>
								{errors.password && <OcError message={errors.password} />}
							</div>
							<div className="login__forgot-block">
								<div className="remember">
									<OcCheckboxComponent
										labelText="Remember Me"
										name="remember"
										checked={values.remember}
										onChange={handleChange}
										touched={String(touched.remember)}
										onBlur={handleBlur}
									/>
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
								disabled={isSubmitting}
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

export default OcLoginComponent;
