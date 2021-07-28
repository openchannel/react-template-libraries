import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { OcSignupComponent } from '@openchannel/react-common-components';

export default {
	title: 'Sign Up Custom [BEM]',
	component: OcSignupComponent,
} as Meta;

const DefaultComponent: Story<any> = (args) => {
	const [showSignupFeedbackPage, setFeedbackPageVisible] = React.useState(
		args.showSignupFeedbackPage,
	);
	const selectConfigOptions: string[] =
		args.enableTypesDropdown && args.formConfigs
			? args.formConfigs.map((config) => config.name)
			: [];
	const [selectValue, setSelectValue] = React.useState(selectConfigOptions[0]);

	return (
		<BrowserRouter>
			<div style={{ margin: '3em' }}>
				<OcSignupComponent
					{...args}
					showSignupFeedbackPage={showSignupFeedbackPage}
					setFeedbackPageVisible={setFeedbackPageVisible}
					selectValue={selectValue}
					setSelectValue={setSelectValue}
					selectConfigOptions={selectConfigOptions}
					enableTypesDropdown
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
	enableTypesDropdown: false,
};

export const WithoutConfigs = DefaultComponent.bind({});
WithoutConfigs.args = {
	loginUrl: 'login',
	companyLogoUrl: './img/logo-company.png',
	enableTypesDropdown: false,
	formConfigs: [],
};

export const MultiConfigs = DefaultComponent.bind({});
MultiConfigs.args = {
	companyLogoUrl: './img/logo-company.png',
	enableTypesDropdown: true,
	formConfigs: [
		{
			name: 'First Form',
			account: {
				includeFields: ['name', 'email'],
				typeData: {
					fields: [
						{
							id: 'name',
							type: 'text',
							label: 'Name',
							attributes: {
								required: true,
							},
						},
						{
							id: 'email',
							type: 'text',
							label: 'Email',
							attributes: {
								required: true,
							},
						},
						{
							id: 'about-me',
							type: 'text',
							attributes: {
								required: true,
							},
							label: 'About me',
						},
					],
				},
				type: 'first-account-form',
			},
			organization: {
				includeFields: ['customData.organization'],
				typeData: {
					fields: [
						{
							id: 'customData.company',
							type: 'text',
							label: 'Company',
							attributes: {
								required: true,
							},
						},
						{
							id: 'customData.country',
							type: 'text',
							label: 'Country',
							attributes: {
								required: true,
							},
						},
					],
				},
				type: 'first-organization-form',
			},
			fieldsOrder: ['email', 'name'],
		},
		{
			name: 'Second Form',
			account: {
				includeFields: ['name', 'email', 'about-me'],
				typeData: {
					fields: [
						{
							id: 'name',
							type: 'text',
							label: 'Name',
							attributes: {
								required: true,
							},
						},
						{
							id: 'email',
							type: 'text',
							label: 'Email',
							attributes: {
								required: true,
							},
						},
						{
							id: 'about-me',
							type: 'text',
							attributes: {
								required: true,
							},
							label: 'About me',
						},
					],
				},
				type: 'second-account-form',
			},
			organization: {
				includeFields: ['customData.organization', 'customData.country'],
				typeData: {
					fields: [
						{
							id: 'customData.company',
							type: 'text',
							label: 'Company',
							attributes: {
								required: true,
							},
						},
						{
							id: 'customData.country',
							type: 'text',
							label: 'Country',
							attributes: {
								required: true,
							},
						},
					],
				},
				type: 'second-organization-form',
			},
		},
	],
	onSubmit: (values) => console.log(values),
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
	formConfigs: [
		{
			account: {
				includeFields: ['name', 'email'],
				typeData: {
					fields: [
						{
							id: 'name',
							type: 'text',
							label: 'Name',
							attributes: {
								required: true,
							},
						},
						{
							id: 'email',
							type: 'text',
							label: 'Email',
							attributes: {
								required: true,
							},
						},
						{
							id: 'about-me',
							type: 'text',
							attributes: {
								required: true,
							},
							label: 'About me',
						},
					],
				},
				type: 'first-account-form',
			},
			organization: {
				includeFields: ['customData.organization'],
				typeData: {
					fields: [
						{
							id: 'customData.company',
							type: 'text',
							label: 'Company',
							attributes: {
								required: true,
							},
						},
						{
							id: 'customData.country',
							type: 'text',
							label: 'Country',
							attributes: {
								required: true,
							},
						},
					],
				},
				type: 'first-organization-form',
			},
			fieldsOrder: ['email', 'name'],
		},
	],
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
	formConfigs: [
		{
			account: {
				includeFields: ['name', 'email'],
				typeData: {
					fields: [
						{
							id: 'name',
							type: 'text',
							label: 'Name',
							attributes: {
								required: true,
							},
						},
						{
							id: 'email',
							type: 'text',
							label: 'Email',
							attributes: {
								required: true,
							},
						},
						{
							id: 'about-me',
							type: 'text',
							attributes: {
								required: true,
							},
							label: 'About me',
						},
					],
				},
				type: 'first-account-form',
			},
			organization: {
				includeFields: ['customData.organization'],
				typeData: {
					fields: [
						{
							id: 'customData.company',
							type: 'text',
							label: 'Company',
							attributes: {
								required: true,
							},
						},
						{
							id: 'customData.country',
							type: 'text',
							label: 'Country',
							attributes: {
								required: true,
							},
						},
					],
				},
				type: 'first-organization-form',
			},
			fieldsOrder: ['email', 'name'],
		},
	],
	enableTermsCheckbox: true,
	enableCustomTerms: true,
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
	enableTypesDropdown: false,
};
