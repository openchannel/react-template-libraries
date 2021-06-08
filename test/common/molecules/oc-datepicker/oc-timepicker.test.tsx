import * as React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import { nanoid } from 'nanoid';
import { OcTimePicker } from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker/index';

describe('Time picker', () => {
	it('should create', () => {
		const component = mount(<OcTimePicker value={moment()} onChange={() => {}} />);
		expect(component).toBeTruthy();
	});

	it('must contain some time', () => {
		const uniqueHoursId = nanoid();
		const uniqueMinutesId = nanoid();
		const component = mount(
			<OcTimePicker
				value={moment()}
				onChange={() => {}}
				uniqueHoursId={uniqueHoursId}
				uniqueMinutesId={uniqueMinutesId}
			/>,
		);
		const input = component.find(`#${uniqueHoursId}`);
		expect(input.prop('value')).toBeTruthy();
	});
});
