import * as React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { mount } from 'enzyme';
import OcSignupComponent from '../../../src/ui/auth/organisms/oc-signup/oc-signup-custom';
import { OcEditUserFormConfig } from '../../../src/ui/auth/organisms/oc-edit-user-form';

const formConfigs: OcEditUserFormConfig[] = [
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
];

describe('Sign Up Custom', () => {
	let component = mount(
		<BrowserRouter>
			<OcSignupComponent
				loginUrl="/"
				formConfigs={formConfigs}
				goToActivationPage={() => {}}
				forgotPasswordDoneUrl=""
				defaultTypeLabelText="Type"
				customTermsDescription=""
				defaultEmptyConfigsErrorMessage="There are no forms configured."
				showSignupFeedbackPage={false}
				enableTypesDropdown
				enablePasswordField
				companyLogoUrl="./img/logo-company.png"
				onSubmit={() => {}}
				enableTermsCheckbox
				ordinaryTermsDescription={
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
				}
			/>
		</BrowserRouter>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Should render first set of fields', () => {
		expect(component.contains('Email')).toBeTruthy();
		expect(component.contains('Name')).toBeTruthy();
		expect(component.contains('Password')).toBeTruthy();
	});

	it('should click on submit', () => {
		const onButtonClickMock = jest.fn();
		component.setProps({ onSubmit: onButtonClickMock });
		component.simulate('click');
		component.update();
		expect(component.find('.error')).toBeTruthy();
	});
});
