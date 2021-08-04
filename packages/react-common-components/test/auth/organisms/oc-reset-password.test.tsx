import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcResetPasswordComponent, OcResetPasswordProps, OcError } from '@openchannel/react-common-components';

const setUp = (props: OcResetPasswordProps) => shallow(<OcResetPasswordComponent {...props} />);

describe('OcResetPassword', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			companyLogoUrl: '/imgDir/img.png',
			loginUrl: '/',
			signupUrl: '/',
			customClass: '',
			validationError: false,
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render with Error', () => {
		component.setProps({ inputError: 'error' });

		expect(component.find(OcError)).toBeTruthy();
	});
});