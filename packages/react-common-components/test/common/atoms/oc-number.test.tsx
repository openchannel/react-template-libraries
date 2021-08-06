import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import OcNumberComponent from 'packages/react-common-components/src/ui/common/atoms/oc-number';
import { InputNumberProps } from '@openchannel/react-common-components';

const defaultInputProps: InputNumberProps = {
	required: false,
	disabled: false,
	placeholder: 'default value',
};

const setUp = (props: InputNumberProps) => shallow(<OcNumberComponent {...props} />);

describe('Simple number input', () => {
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

	it('should click', async () => {
		const onButtonClickMock = jest.fn();

		component.setProps({ onClick: onButtonClickMock });
		component.simulate('click');

		expect(onButtonClickMock).toHaveBeenCalledTimes(1);
	});
});
