import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { errorMessages } from '../../../src/lib/validation';
import { OcResetPasswordComponent, OcResetPasswordProps } from '../../../src/ui/auth/index';

export default {
	title: 'Reset Password [BEM]',
	component: OcResetPasswordComponent,
} as Meta;

const DefaultComponent: Story<OcResetPasswordProps> = (args) => {
	const [value, setValue] = React.useState('');
	const [blurred, setBlurred] = React.useState(false);
	const [validationError, setError] = React.useState(false);

	const handleButtoClick = () => {
		!value ? setError(true) : setError(false);
	};

	React.useEffect(() => {
		if (value.length > 0) {
			setError(false);
		}
	}, [value]);
	return (
		<BrowserRouter>
			<OcResetPasswordComponent
				{...args}
				inputProps={{
					id: 'input',
					value,
					onChange: (e: any) => setValue(e.target.value),
					onBlur: () => setBlurred(true),
					customClass: blurred && validationError ? 'error' : '',
				}}
				inputError={errorMessages.required()}
				handleButtonClick={handleButtoClick}
				validationError={validationError}
			/>
		</BrowserRouter>
	);
};

export const Default = DefaultComponent.bind({});
Default.args = {
	companyLogoUrl: './img/logo-company.png',
	resendActivationUrl: '/',
	signupUrl: '/',
	inputProps: {
		id: 'input',
	},
};

const FilledComponent: Story<OcResetPasswordProps> = (args) => {
	const [value, setValue] = React.useState('testpassword');
	const [blurred, setBlurred] = React.useState(false);

	return (
		<BrowserRouter>
			<OcResetPasswordComponent
				{...args}
				inputProps={{
					id: 'input',
					value,
					onChange: (e: any) => setValue(e.target.value),
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
