import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { InputProps } from '@openchannel/react-common-components/src/ui';
import OcInputComponent from '../../../src/ui/common/atoms/oc-input/oc-input';

const defaultInputProps: InputProps = {
	value: 'Test input',
	required: false,
	inputType: 'text',
	disabled: false,
	placeholder: 'default value',
};

const setUp = (props: InputProps) => shallow(<OcInputComponent {...props} />);

describe('Default text input', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultInputProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		expect(component.prop('placeholder')).toEqual('default value');
	});

	it('should contain required prop and be true', async () => {
		component.setProps({ required: true });

		expect(component.prop('required')).toBeTruthy();
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
