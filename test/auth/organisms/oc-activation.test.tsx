import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcActivation, OcActivationProps } from '../../../src/ui/auth';
import { OcError } from '../../../src/ui/common/atoms/oc-error';

const setUp = (props: OcActivationProps) => shallow(<OcActivation {...props} />);

describe('OcActivation', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			companyLogoUrl: '/imgDir/img.png',
			resendActivationUrl: '/',
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
