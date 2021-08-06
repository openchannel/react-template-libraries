import * as React from 'react';
import { mount } from 'enzyme';
import { OcTextareaProps } from '@openchannel/react-common-components';
import OcTextarea from 'packages/react-common-components/src/ui/form/atoms/oc-textarea/oc-textarea';

const setUp = (props: OcTextareaProps) => mount(<OcTextarea {...props} />);

describe('OcTextarea', () => {
	let wrapper: any;

	const onChangeMock = jest.fn();

	beforeEach(() => {
		wrapper = setUp({
			value: '',
			onChange: onChangeMock,
		});
	});

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	});

	it('should render with optional props', () => {
		wrapper.setProps({
			disabled: true,
			required: true,
			rows: 10,
			customClass: 'should-be-red',
		});

		expect(wrapper.find('textarea').props().disabled).toBe(true);
		expect(wrapper.find('textarea').props().required).toBe(true);
		expect(wrapper.find('textarea').props().rows).toBe(10);
		expect(wrapper.find('textarea').some('.should-be-red')).toBeTruthy();
	});
});
