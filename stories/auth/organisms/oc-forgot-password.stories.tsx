import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { errorMessages } from '../../../src/react-common-components/ui/form/lib';
import { OcForgotPasswordComponent, OcForgotPasswordProps } from '../../../src/react-common-components/ui/auth';

export default {
	title: 'Forgot Password [BEM]',
	component: OcForgotPasswordComponent,
} as Meta;

const DefaultComponent: Story<OcForgotPasswordProps> = (args) => (
	<BrowserRouter>
		<OcForgotPasswordComponent {...args} />
	</BrowserRouter>
);

export const Default = DefaultComponent.bind({});
Default.args = {
	companyLogoUrl: './img/logo-company.png',
	signupUrl: '/',
	loginUrl: '/',
	inputProps: {
		id: 'input',
	},
};

const FilledComponent: Story<OcForgotPasswordProps> = (args) => {
	const [value, setValue] = React.useState('zmehta@tenupsoft.com');
	const [blurred, setBlurred] = React.useState(false);

	return (
		<BrowserRouter>
			<OcForgotPasswordComponent
				{...args}
				inputProps={{
					id: 'input',
					value,
					onChange: (e) => setValue(e.target.value),
					onBlur: () => setBlurred(true),
				}}
				inputError={blurred && !value && errorMessages.required()}
			/>
		</BrowserRouter>
	);
};

export const Filled = FilledComponent.bind({});
Filled.args = {
	companyLogoUrl: './img/logo-company.png',
	signupUrl: '/',
	loginUrl: '/',
};

export const ResultPage = DefaultComponent.bind({});
ResultPage.args = {
	companyLogoUrl: './img/logo-company.png',
	forgotPasswordDoneUrl: './img/email_done.svg',
	signupUrl: '/',
	loginUrl: '/',
	inputProps: {
		id: 'input',
	},
	showResultPage: true,
};
