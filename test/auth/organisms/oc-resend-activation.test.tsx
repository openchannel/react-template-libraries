import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcResendActivation, OcResendProps } from '../../../src/react-common-components/ui/auth';
import { OcError } from '../../../src/react-common-components/ui/common/atoms/oc-error';

const setUp = (props: OcResendProps) => shallow(<OcResendActivation {...props} />);

describe('OcActivation', () => {
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
