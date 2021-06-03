import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { errorMessages } from '../../../src/lib/validation';
import { OcResendActivation, OcResendProps } from '../../../src/ui/auth';

export default {
	title: 'Resend Activation Code [BEM]',
	component: OcResendActivation,
} as Meta;

const DefaultComponent: Story<OcResendProps> = (args) => (
	<BrowserRouter>
		<OcResendActivation {...args} />
	</BrowserRouter>
);

export const Empty = DefaultComponent.bind({});
Empty.args = {
	companyLogoUrl: './img/logo-company.png',
	loginUrl: '/',
	signupUrl: '/',
	inputProps: {
		id: 'input',
	},
};

const FilledComponent: Story<OcResendProps> = (args) => {
	const [value, setValue] = React.useState('zmehta@tenupsoft.com');
	const [blurred, setBlurred] = React.useState(false);

	return (
		<BrowserRouter>
			<OcResendActivation
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
	loginUrl: '/',
	signupUrl: '/',
};
