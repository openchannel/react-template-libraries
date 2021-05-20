import * as React from 'react';
import moment from 'moment';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { OcTimePicker } from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker/index';

import {
  OcDatetimePicker,
  // DatepickerProps,
} from '../../../../src/ui/common/molecules/oc-datetime-picker/index';

describe('OcDatetimePicker', () => {
  let component: ShallowWrapper = shallow(
    <OcDatetimePicker date={moment()} setDate={() => {}} disabled={false} type="date" />,
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date', () => {
    const dummyDate = moment();
    component.setProps({ date: dummyDate });
    expect(component.prop('value')).toEqual(dummyDate);
  });

  it('should set correct type and make timepicker visible', () => {
    const wrapper = mount(
      <OcDatetimePicker date={moment()} setDate={() => {}} disabled={false} type="date" />,
    );
    wrapper.setProps({ type: 'datetime' });

    const timepicker = component.find(OcTimePicker);

    expect(timepicker).toBeTruthy();
  });

  it('should imitate disabled state', () => {
    const wrapper = mount(
      <OcDatetimePicker date={moment()} setDate={() => {}} disabled={false} type="date" />,
    );
    wrapper.setProps({ disabled: true });
    expect(wrapper.find('input').prop('disabled')).toBe(true);
  });
});
