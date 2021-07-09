import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { OcResetPasswordComponent, OcResetPasswordProps } from '../../../packages/react-common-components/src/ui/auth/index';
import { errorMessages } from '../../../packages/react-common-components/src/ui/form/lib';

export default {
	title: 'Reset Password [BEM]',
	component: OcResetPasswordComponent,
} as Meta;

const DefaultComponent: Story<OcResetPasswordProps> = (args) => {
	const [value, setValue] = React.useState('');
	const [blurred, setBlurred] = React.useState(false);
	const [validationError, setError] = React.useState(false);

	const handleButtonClick = () => {
		!value ? (setBlurred(true), setError(true)) : (setError(false), setBlurred(false));
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
					onBlur: () => (setBlurred(true), handleButtonClick()),
					customClass: blurred && validationError ? 'error-border' : '',
				}}
				inputError={errorMessages.required()}
				handleButtonClick={handleButtonClick}
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
