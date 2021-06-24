import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcLoginComponent, LoginProps } from '../../../src/ui/auth';

const setUp = (props: LoginProps) => shallow(<OcLoginComponent {...props} />);

describe('Forgot Password', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			handleSubmit: () => {},
			companyLogoUrl: './img/logo-company.png',
			forgotPwdUrl: '/',
			loginButtonText: 'Log In',
			process: false,
			signupUrl: '/',
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
