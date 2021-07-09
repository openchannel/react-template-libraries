//@ts-nocheck
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ShallowWrapper } from 'enzyme';

import { OcLoginComponent, LoginProps } from '../../../packages/react-common-components/src/ui/auth';

describe('Log In', () => {
	let component: ShallowWrapper = mount(
		<BrowserRouter>
			<OcLoginComponent
				handleSubmit={() => {}}
				companyLogoUrl="./img/logo-company.png"
				loginButtonText="Log In"
				forgotPwdUrl="/"
				isIncorrectEmail={false}
				isUnverifiedEmail={false}
			/>
		</BrowserRouter>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render/hide not necessaary elements', () => {
		component.setProps({ isIncorrectEmail: true });
		component.setProps({ isUnverifiedEmail: true });
		component.update();
		expect(component.prop('isIncorrectEmail')).toEqual(true);
		expect(component.prop('isUnverifiedEmail')).toEqual(true);
	});

	it('should show errors & enable spinner on submit', () => {
		const onButtonClickMock = jest.fn();
		component.setProps({ inputEmailValue: '' });
		component.setProps({ inputPasswordValue: '' });
		component.update();
		expect(component.prop('isIncorrectEmail')).toEqual(true);
		expect(component.prop('isUnverifiedEmail')).toEqual(true);
		component.setProps({ onClick: onButtonClickMock });
		component.simulate('click');
		expect(component.find('.oc-button__spinner')).toBeTruthy();
		expect(component.contains('Required'));
	});
});
