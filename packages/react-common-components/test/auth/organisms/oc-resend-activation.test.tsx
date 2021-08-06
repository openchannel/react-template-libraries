import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcResendProps } from '@openchannel/react-common-components';
import OcResendActivation from 'packages/react-common-components/src/ui/auth/organisms/oc-resend-activation/oc-resend-activation';
import OcError from 'packages/react-common-components/src/ui/common/atoms/oc-error/oc-error';

const setUp = (props: OcResendProps) => shallow(<OcResendActivation {...props} />);

describe('OcResendActivation', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			companyLogoUrl: '/imgDir/img.png',
			loginUrl: '/',
			signupUrl: '/',
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
