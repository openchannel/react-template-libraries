import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { errorMessages } from '../../../src/ui/form';
import { OcResendActivation, OcResendProps } from '../../../src/ui/auth';

export default {
	title: 'Resend Activation Code [BEM]',
	component: OcResendActivation,
} as Meta;
const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const DefaultComponent: Story<OcResendProps> = (args) => {
	const [value, setValue] = React.useState('');
	const [blurred, setBlurred] = React.useState(false);
	const [validationError, setValidationError] = React.useState(false);
	const handleChange = (e: any) => {
		setValue(e.target.value);
		e.target.value.match(regexEmail) === null && args.inputProps.inputType === 'email'
			? (setValidationError(true), e.preventDefault())
			: (setValidationError(false), setValue(e.target.value));
	};
	return (
		<BrowserRouter>
			<OcResendActivation
				{...args}
				inputProps={{
					id: 'input',
					inputType: 'email',
					value,
					onChange: (e) => handleChange(e),
					onBlur: () => setBlurred(true),
					customClass: validationError ? 'error' : '',
				}}
				inputError={
					validationError ? errorMessages.email() : blurred && !value && errorMessages.required()
				}
			/>
		</BrowserRouter>
	);
};

export const Empty = DefaultComponent.bind({});
Empty.args = {
	companyLogoUrl: './img/logo-company.png',
	loginUrl: '/',
	signupUrl: '/',
	inputProps: {
		id: 'input',
		inputType: 'email',
	},
};

const FilledComponent: Story<OcResendProps> = (args) => {
	const [value, setValue] = React.useState('zmehta@tenupsoft.com');
	const [blurred, setBlurred] = React.useState(false);
	const [validationError, setValidationError] = React.useState(false);
	const handleChange = (e: any) => {
		console.log(e.target.value);
		e.target.value.match(regexEmail) === null && args.inputProps.inputType === 'email'
			? (setValidationError(true), e.preventDefault())
			: (setValidationError(false), setValue(e.target.value));
	};
	return (
		<BrowserRouter>
			<OcResendActivation
				{...args}
				inputProps={{
					id: 'input',
					inputType: 'email',
					value,
					onChange: (e) => handleChange(e),
					onBlur: () => setBlurred(true),
				}}
				inputError={
					(blurred && !value && errorMessages.required()) ||
					(blurred && validationError && errorMessages.email())
				}
			/>
		</BrowserRouter>
	);
};

export const Filled = FilledComponent.bind({});
Filled.args = {
	companyLogoUrl: './img/logo-company.png',
	loginUrl: '/',
	signupUrl: '/',
	inputProps: {
		id: 'input',
		inputType: 'email',
	},
};
