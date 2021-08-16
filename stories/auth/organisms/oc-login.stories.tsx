import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LoginProps } from '@openchannel/react-common-components/src/ui';
import OcLoginComponent from '../../../packages/react-common-components/src/ui/auth/organisms/oc-login';

export default {
	title: 'Login [BEM]',
	component: OcLoginComponent,
} as Meta;

const DefaultComponent: Story<LoginProps> = (args) => {
	return (
		<BrowserRouter>
			<OcLoginComponent {...args} />
		</BrowserRouter>
	);
};

export const EmptyLogin = DefaultComponent.bind({});
EmptyLogin.args = {
	handleSubmit: action('handleSubmit'),
	companyLogoUrl: './img/logo-company.png',
	loginButtonText: 'Log In',
	forgotPwdUrl: '/',
	isIncorrectEmail: false,
	isUnverifiedEmail: false,
};

export const FilledLogin = DefaultComponent.bind({});
FilledLogin.args = {
	handleSubmit: action('handleSubmit'),
	companyLogoUrl: './img/logo-company.png',
	loginButtonText: 'Log In',
	forgotPwdUrl: '/',
	inputEmailValue: 'zmehta@gmail.com',
	inputPasswordValue: 'Tenup123#',
	isIncorrectEmail: false,
	isUnverifiedEmail: false,
};

export const DisplayErrorsLogin = DefaultComponent.bind({});
DisplayErrorsLogin.args = {
	handleSubmit: action('handleSubmit'),
	companyLogoUrl: './img/logo-company.png',
	loginButtonText: 'Log In',
	forgotPwdUrl: '/',
	isIncorrectEmail: true,
	isUnverifiedEmail: true,
};
