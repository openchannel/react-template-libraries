import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Button, ButtonProps } from '../../../src/ui/common';


const defaultButtonProps: Partial<ButtonProps> = {
	htmlType: 'button',
	text: 'Test button',
	type: 'primary',
	disabled: false,
};

const setUp = (props: Partial<ButtonProps>) => shallow(<Button {...props} />);

describe('Button (common button)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultButtonProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		expect(component.text()).toEqual('Test button');
	});

	it('should contain style variant value and exist', async () => {
		component.setProps({ type: 'secondary' });

		const classExist = component.hasClass('oc-button_secondary')

		expect(classExist).toBeTruthy();
	});

	it('button should be disabled', async () => {
		component.setProps({ disabled: true });

		expect(component.prop('disabled')).toBeTruthy();
	});

	it('should click', async () => {
		const onButtonClickMock = jest.fn();

		component.setProps({ onClick: onButtonClickMock });
		component.simulate('click');

		expect(onButtonClickMock).toHaveBeenCalledTimes(1);
	});
});
