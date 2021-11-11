import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import OcSignupComponent from '../../../packages/react-common-components/src/ui/auth/organisms/oc-signup/index';

import { mockSignupConfigs } from './mockData';

export default {
	title: 'Sign Up Custom [BEM]',
	component: OcSignupComponent,
} as Meta;

const DefaultComponent: Story<any> = (args) => {
	return (
		<BrowserRouter>
			<div style={{ margin: '3em' }}>
				<OcSignupComponent
					{...args}
					showSignupFeedbackPage={args.showSignupFeedbackPage}
					enableTypesDropdown={args.enableTypesDropdown}
					enablePasswordField={args.enablePasswordField}
				/>
			</div>
		</BrowserRouter>
	);
};

export const LoadingConfigs = DefaultComponent.bind({});
LoadingConfigs.args = {
	companyLogoUrl: './img/logo-company.png',
	formConfigs: null,
};

export const WithoutConfigs = DefaultComponent.bind({});
WithoutConfigs.args = {
	loginUrl: 'login',
	companyLogoUrl: './img/logo-company.png',
	formConfigs: [],
};

export const MultiConfigs = DefaultComponent.bind({});
MultiConfigs.args = {
	companyLogoUrl: './img/logo-company.png',
	formConfigs: mockSignupConfigs,
	onSubmit: action('onSubmit'),
	enablePasswordField: true,
	enableTermsCheckbox: true,
	ordinaryTermsDescription: (
		<>
			I agree to{' '}
			<Link to="/" className="edit-user-form__content__link">
				Terms of service
			</Link>{' '}
			and{' '}
			<Link className="edit-user-form__content__link" to="/">
				Data Processing Policy
			</Link>
		</>
	),
};

export const OneConfig = DefaultComponent.bind({});
OneConfig.args = {
	loginUrl: 'login',
	companyLogoUrl: './img/logo-company.png',
	formConfigsLoading: false,
	formConfigs: mockSignupConfigs,
	enablePasswordField: true,
	enableTermsCheckbox: true,
	ordinaryTermsDescription: (
		<>
			I agree to{' '}
			<Link to="/" className="edit-user-form__content__link">
				Terms of service
			</Link>{' '}
			and{' '}
			<Link className="edit-user-form__content__link" to="/">
				Data Processing Policy
			</Link>
		</>
	),
};

export const CustomTermsConfig = DefaultComponent.bind({});
CustomTermsConfig.args = {
	loginUrl: 'login',
	companyLogoUrl: './img/logo-company.png',
	formConfigsLoading: false,
	formConfigs: [mockSignupConfigs[0]],
	enableTermsCheckbox: true,
	customTermsDescription: (
		<>
			Custom
			<Link to="/">Terms</Link>
		</>
	),
	enablePasswordField: true,
};

export const ResultPage = DefaultComponent.bind({});
ResultPage.args = {
	loginUrl: 'login',
	companyLogoUrl: './img/logo-company.png',
	showSignupFeedbackPage: true,
	forgotPasswordDoneUrl: './img/email_done.svg',
	formConfigs: null,
};
