import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { errorMessages } from '../../../src/lib/validation';
import { OcActivation, OcActivationProps } from '../../../src/ui/auth';


export default {
	title: 'User Activation',
	component: OcActivation,
} as Meta;

export const Default: Story<OcActivationProps> = () => (
	<BrowserRouter>
		<OcActivation
			companyLogoUrl="./img/logo-company.png"
			resendActivationUrl="/"
			signupUrl="/"
			inputProps={{
				id: 'input',
			}}
		/>
	</BrowserRouter>
);

export const Filled: Story<OcActivationProps> = () => {
	const [value, setValue] = React.useState('');
	const [blurred, setBlurred] = React.useState(false);

	return (
		<BrowserRouter>
			<OcActivation
				companyLogoUrl="./img/logo-company.png"
				resendActivationUrl="/"
				signupUrl="/"
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
}
