//@ts-nocheck
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ShallowWrapper } from 'enzyme';

import { LoginProps, OcLoginComponent } from '../../../src/ui/auth/organisms/oc-login';;


const setUp = (props: LoginProps) =>
	mount(
		<BrowserRouter>
			<OcLoginComponent {...props} />
		</BrowserRouter>,
	);

describe('Log In', () => {
	const activationLinkClick = jest.fn()

	let component: ShallowWrapper = mount(
		<BrowserRouter>
			<OcLoginComponent
				handleSubmit={() => {}}
				companyLogoUrl="./img/logo-company.png"
				loginButtonText="Log In"
				forgotPwdUrl="/"
				isIncorrectEmail={false}
				isUnverifiedEmail={false}
			/>
		</BrowserRouter>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render/hide not necessaary elements', () => {
		component.setProps({ isIncorrectEmail: true });
		component.setProps({ isUnverifiedEmail: true });
		component.update();
		expect(component.prop('isIncorrectEmail')).toEqual(true);
		expect(component.prop('isUnverifiedEmail')).toEqual(true);
	});

	it('should show errors & enable spinner on submit', () => {
		const onButtonClickMock = jest.fn();
		component.setProps({ inputEmailValue: '' });
		component.setProps({ inputPasswordValue: '' });
		component.update();
		expect(component.prop('isIncorrectEmail')).toEqual(true);
		expect(component.prop('isUnverifiedEmail')).toEqual(true);
		component.setProps({ onClick: onButtonClickMock });
		component.simulate('click');
		expect(component.find('.oc-button__spinner')).toBeTruthy();
		expect(component.contains('Required'));
	});


	it('should contain React.ReactNode element', () => {
		const wrapper = setUp({
			isIncorrectEmail: true
		});

		expect(wrapper.find('.login__error.login__warn-block').text()).toEqual('The email and password you have provided is incorrect.');
	});

	it('should contain React.ReactNode element', () => {
		const wrapper = setUp({
			isUnverifiedEmail: true,
		});

		expect(wrapper.find('.login__error').text()).toEqual('This account has not been activated yet. Please check your inbox for an activation email or resend the activation email');
	});

	it('should fire callback if user clicks', () => {
		const wrapper = setUp({
			isUnverifiedEmail: true,
			onActivationLinkClick: activationLinkClick,
		});

		const activationLink = wrapper.find('.login__error').find('a[role="button"]')
		activationLink.simulate('click')
		expect(activationLinkClick).toHaveBeenCalled();
	});

	it('should contain React.ReactNode element', () => {
		const wrapper = setUp({
			isPasswordResetRequired: true
		});

		expect(wrapper.find('.login__warn.login__warn-block').text()).toEqual('Your password must be changed. We’ve sent an email to  with a link to help you reset your password.');
	});
});
