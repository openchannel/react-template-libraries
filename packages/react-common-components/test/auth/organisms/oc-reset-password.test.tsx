import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcResetPasswordProps } from '@openchannel/react-common-components';
import OcResetPasswordComponent from '../../../src/ui/auth/organisms/oc-reset-password';
import OcError from '../../../src/ui/common/atoms/oc-error/oc-error';

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
