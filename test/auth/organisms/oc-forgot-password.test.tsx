import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcForgotPasswordComponent, OcForgotPasswordProps } from '../../../src/ui/auth';

const setUp = (props: OcForgotPasswordProps) => shallow(<OcForgotPasswordComponent {...props} />);

describe('OcActivation', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			companyLogoUrl: './img/logo-company.png',
			forgotPasswordDoneUrl: './img/email_done.svg',
			signupUrl: '/',
			loginUrl: '/',
			inputProps: {
				id: 'input',
			},
			showResultPage: false,
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render result page', () => {
		component.setProps({ showResultPage: true });

		expect(component.find('.forgot-password__header-result')).toBeTruthy();
	});
});
