import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

// import { errorMessages } from '../../../src/ui/form';
import { OcLoginComponent, LoginProps } from '../../../src/ui/auth';

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
	handleSubmit: (values) => console.log(values),
	companyLogoUrl: './img/logo-company.png',
	loginButtonText: 'Log In',
	forgotPwdUrl: '/',
};

export const FilledLogin = DefaultComponent.bind({});
FilledLogin.args = {
	handleSubmit: (values) => console.log(values),
	companyLogoUrl: './img/logo-company.png',
	loginButtonText: 'Log In',
	forgotPwdUrl: '/',
	inputEmailValue: 'zmehta@gmail.com',
	inputPasswordValue: 'Tenup123#',
};
