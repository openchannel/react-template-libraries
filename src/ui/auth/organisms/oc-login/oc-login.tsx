// commit 8042d87b78e1a50f433116e39cb0a61c0a457b9f Author: Julia Date: 26.02.21, 19:40
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import {
	OcButtonComponent,
	OcError,
	OcLabelComponent,
	OcPasswordComponent,
	OcInputComponent,
	OcCheckboxComponent,
} from '../../../../ui/common';

import { LoginProps } from './types';

import './style.scss';

export const OcLoginComponent: React.FC<LoginProps> = (props) => {
	const {
		handleSubmit,
		companyLogoUrl,
		forgotPwdUrl,
		loginButtonText,
		// onActivationLinkClick,
		// onChange,
		process,
		// sendActivationLink,
		signupUrl,
		inputEmailValue,
		inputPasswordValue,
	} = props;

	const formik = useFormik({
		initialValues: {
			email: inputEmailValue || '',
			password: inputPasswordValue || '',
		},
		onSubmit: (values) => handleSubmit(values),
	});

	return (
		<div className="login login-card login-card_borders">
			<form onSubmit={formik.handleSubmit}>
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
					<div className="login__email login__email_margin_top">
						<OcLabelComponent text="Email" className="login__form-label login__email-label" />
						<OcInputComponent
							placeholder="Email"
							required
							name="email"
							customClass="login__email-input"
							value={formik.values.email}
							onChange={formik.handleChange}
						/>
						{formik.errors.email ? (
							<OcError /* className="login__email-error" */ message={formik.errors.email} />
						) : null}
					</div>
					<div className="login__password">
						<OcLabelComponent text="Password" className="login__form-label login__password-label" />
						<OcPasswordComponent
							placeholder="Password"
							customClass="login__password-input"
							name="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							required
						/>
						{formik.errors.password ? (
							<OcError /* className="login__password-error" */ message={formik.errors.password} />
						) : null}
					</div>
					<div className="login__forgot-block">
						<div className="remember">
							<OcCheckboxComponent
								// className="remember__checkbox"
								type="checkbox"
								labelText="Remember Me"
							/>
						</div>
						<div className="forgot">
							<Link className="forgot__link" to={forgotPwdUrl || '/'}>
								Forgot password?{' '}
							</Link>
						</div>
					</div>
					<OcButtonComponent
						onClick={handleSubmit}
						process={process}
						text={loginButtonText}
						type="primary"
						customClass="login__button"
					/>
					<div className="login__sign-up">
						Dont have an account yet?{' '}
						<Link className="login__sign-up-link" to={signupUrl || '/'}>
							Sign Up
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
};
