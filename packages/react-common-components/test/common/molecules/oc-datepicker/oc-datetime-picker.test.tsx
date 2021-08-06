import * as React from 'react';
import moment from 'moment';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import OcDatetimePicker from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-datetime';

import { OcTimePicker } from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker';

describe('OcDatetimePicker', () => {
	const dummyDate = moment();

	let component: ShallowWrapper = shallow(
		<OcDatetimePicker
			value={dummyDate}
			onChange={() => {}}
			disabled={false}
			type="date"
			settings="DD/MM/YYYY"
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have date', () => {
		component.setProps({ date: dummyDate });
		expect(component.prop('value')).toEqual(dummyDate);
	});

	it('should set correct type and make timepicker visible', () => {
		const wrapper = mount(
			<OcDatetimePicker
				value={dummyDate}
				onChange={() => {}}
				disabled={false}
				type="date"
				settings="DD/MM/YYYY"
			/>,
		);
		wrapper.setProps({ type: 'datetime' });

		const timepicker = component.find(OcTimePicker);

		expect(timepicker).toBeTruthy();
	});

	it('should imitate disabled state', () => {
		const wrapper = mount(
			<OcDatetimePicker
				value={dummyDate}
				onChange={() => {}}
				disabled={false}
				type="date"
				settings="DD/MM/YYYY"
			/>,
		);
		wrapper.setProps({ disabled: true });
		expect(wrapper.find('input').prop('disabled')).toBe(true);
	});
});
