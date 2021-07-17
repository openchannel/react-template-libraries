import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { OcLoginComponent, LoginProps } from '../../../packages/react-common-components/src/ui/auth';

export default {
	title: 'Login [BEM]',
	component: OcLoginComponent,
} as Meta;

const DefaultComponent: Story<LoginProps> = (args) => {
	const [isIncorrectEmail, setIncorrectEmailError] = React.useState(args.isIncorrectEmail);
	const [isUnverifiedEmail, setUnverifiedEmail] = React.useState(args.isUnverifiedEmail);

	return (
		<BrowserRouter>
			<OcLoginComponent
				{...args}
				isIncorrectEmail={isIncorrectEmail}
				isUnverifiedEmail={isUnverifiedEmail}
			/>
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
