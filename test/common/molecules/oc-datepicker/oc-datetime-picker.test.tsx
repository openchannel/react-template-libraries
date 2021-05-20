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
    component.setProps({ date: moment() });
    expect(component.prop('value')).toEqual(moment());
  });

  it('should set correct type and make timepicker visible', () => {
    component.setProps({ type: 'datetime' });

    const timepicker = component.find(OcTimePicker);

    expect(timepicker).toBeTruthy();
  });

  it('should imitate disabled state', () => {
    component.setProps({ disabled: true });
    expect(component.find('input').prop('disabled')).toBe(true);
  });
});
