import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { ColorProps } from '@openchannel/react-common-components';
import OcColorComponent from '../../../src/ui/common/atoms/oc-color';

const defaultColorProps: ColorProps = {
	placeholder: 'Enter color value here',
	disabled: false,
	style: {},
	colorValue: '',
	onValueChange: (color: any) => color,
};

const setUp = (props: ColorProps) => shallow(<OcColorComponent {...props} />);

describe('Basic Color Input', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultColorProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have an exact placeholder', () => {
		const wrapper = mount(<OcColorComponent {...defaultColorProps} />);
		expect(wrapper.prop('placeholder')).toEqual('Enter color value here');
	});

	it('should click on colorpicker', () => {
		const mockCallback = jest.fn();
		const wrapper = mount(<OcColorComponent {...defaultColorProps} onClick={mockCallback} />);
		wrapper.find('.color-adjust__input').simulate('change', { target: { value: '#AAA' } });
		expect(wrapper.find('.color-adjust__input').props().value).toEqual('#AAA');
	});
});
