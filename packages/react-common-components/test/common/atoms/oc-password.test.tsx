import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { PasswordProps } from '@openchannel/react-common-components/src/ui';
import OcPasswordComponent from '../../../src/ui/common/atoms/oc-password/oc-password';

const defaultPasswordProps: PasswordProps = {
	value: 'Test password',
	required: false,
	disabled: false,
	placeholder: 'default value',
	onChange: (e: any) => e,
};

const setUp = (props: PasswordProps) => shallow(<OcPasswordComponent {...props} />);

describe('Default password input', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultPasswordProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		expect(component.find('input').props().placeholder).toEqual('default value');
	});

	it('should type some text and assess it', async () => {
		const wrapper = mount(<OcPasswordComponent {...defaultPasswordProps} />);
		const input = wrapper.find('input');
		input.simulate('change', { target: { value: 'Hello' } });
		expect(input.contains('Hello'));
	});
});
