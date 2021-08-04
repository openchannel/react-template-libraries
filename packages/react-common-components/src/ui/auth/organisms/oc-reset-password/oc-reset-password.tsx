// commit 8042d87b78e1a50f433116e39cb0a61c0a457b9f Author: Julia Date: 26.02.21, 19:40
import * as React from 'react';
import { Link } from 'react-router-dom';

import OcLabelComponent from '../../../common/atoms/oc-label';
import OcPasswordComponent from '../../../common/atoms/oc-password';
import OcButtonComponent from '../../../common/atoms/oc-button';
import OcError from '../../../common/atoms/oc-error/oc-error';
import { OcResetPasswordProps } from './types';

import './styles.scss';

export const OcResetPasswordComponent: React.FC<OcResetPasswordProps> = (props) => {
	const {
		companyLogoUrl,
		loginUrl,
		signupUrl,
		process,
		inputProps,
		inputError,
		value,
		onChange,
		validationError,
		handleButtonClick,
	} = props;

	return (
		<div className="reset-password login-card login-card_borders">
			{/*<form noValidate>*/}
			<div className="reset-password__card-body">
				<div className="reset-password__logo">
					<img src={companyLogoUrl} className="company-logo" alt="logo" />
				</div>
				<div className="reset-password__header">
					<h4 className="reset-password__header-heading">New Password</h4>
					<OcLabelComponent>Create new password</OcLabelComponent>
				</div>
				<div className="reset-password__password-group">
					<span className="reset-password__password-group-label">
						<OcLabelComponent htmlFor={inputProps?.id}>New Password</OcLabelComponent>
					</span>
					<OcPasswordComponent
						disabled={false}
						placeholder="New Password"
						value={value}
						onChange={onChange}
						required
						{...inputProps}
					/>
					{validationError && <OcError message={String(inputError)} />}
				</div>
				<OcButtonComponent
					htmlType="submit"
					type="primary"
					customClass="reset-password__button"
					process={process}
					onClick={handleButtonClick}
				>
					Confirm
				</OcButtonComponent>
				<div className="reset-password__log-in">
					<OcLabelComponent>Already have an account?</OcLabelComponent>
					<Link to={loginUrl} className="reset-password__link">
						{' '}
						Log In
					</Link>
				</div>
				<div className="reset-password__sign-up">
					<OcLabelComponent>Don&apos;t have an account yet?</OcLabelComponent>
					<Link to={signupUrl} className="reset-password__link">
						{' '}
						Sign Up
					</Link>
				</div>
			</div>
			{/*</form>*/}
		</div>
	);
};

export default OcResetPasswordComponent;
