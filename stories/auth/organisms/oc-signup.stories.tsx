import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { OcSignupComponent } from '@openchannel/react-common-components';

export default {
	title: 'Sign Up Custom [BEM]',
	component: OcSignupComponent,
} as Meta;

const DefaultComponent: Story<any> = (args) => {
	const [showSignupFeedbackPage, setFeedbackPageVisible] = React.useState(false);
	const [termsChecked, setTermsChecked] = React.useState(false);
	const [selectedConfigName, setSelectedConfig] = React.useState(args.formConfigs[0].name);
	return (
		<BrowserRouter>
			<OcSignupComponent
				{...args}
				showSignupFeedbackPage={showSignupFeedbackPage}
				setFeedbackPageVisible={setFeedbackPageVisible}
				termsChecked={termsChecked}
				setTermsChecked={setTermsChecked}
				selectedConfig={selectedConfigName}
				setSelectedConfig={setSelectedConfig}
				enableTypesDropdown
			/>
		</BrowserRouter>
	);
};

export const Default = DefaultComponent.bind({});
Default.args = {
	companyLogoUrl: './img/logo-company.png',
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
	onCancel: () => {},
	onSubmit: () => {},
};
