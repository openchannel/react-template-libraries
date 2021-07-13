import * as React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';

import { OcTimePicker } from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker';

describe('Time picker', () => {
	it('should create', () => {
		const component = mount(<OcTimePicker value={moment()} onChange={() => {}} />);
		expect(component).toBeTruthy();
	});

	it('must contain some time', () => {
		const component = mount(<OcTimePicker value={moment()} onChange={() => {}} />);
		const input = component.find('input').get(0);
		expect(input.props.value).toBeTruthy();
	});
});
