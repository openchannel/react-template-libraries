import * as React from 'react';
import {
	OcError,
	OcLabelComponent,
	OcPasswordComponent,
	OcInputComponent,
} from '../../../../ui/common';
import { useField } from 'formik';
import './style.scss';

export const FormikInputPassword = (props: any) => {
	const [field, meta] = useField(props);
	return (
		<div className="login__password">
			<OcLabelComponent
				htmlFor="login_password"
				text="Password"
				className="login__form-label login__password-label"
			/>
			<OcPasswordComponent
				{...field}
				{...props}
				placeholder="Password"
				customClass="login__password-input"
				id="login_password"
				required
			/>
			{meta.touched && meta.error && <OcError message={[meta.error]} />}
		</div>
	);
};

export const FormikInputEmail = (props: any) => {
	const [field, meta] = useField(props);
	return (
		<div className="login__email login__email_margin_top">
			<OcLabelComponent
				htmlFor="login_email"
				text="Email"
				className="login__form-label login__email-label"
			/>
			<OcInputComponent
				{...field}
				{...props}
				placeholder="Email"
				required
				id="login_email"
				customClass="login__email-input"
			/>
			{meta.touched && meta.error && <OcError message={[meta.error]} />}
		</div>
	);
};
