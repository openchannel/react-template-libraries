import * as React from 'react';
import moment from 'moment';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  OcTimePicker,
  TimepickerProps,
} from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker/index';

const setUp = (props: TimepickerProps) => shallow(<OcTimePicker {...props} />);

describe('OcSelect - list item component', () => {
  const component: ShallowWrapper = setUp({
    value: moment().toNow(),
    setDate: () => {},
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('must contain some time', () => {
    component.find('input').forEach((input) => {
      expect(input.prop('value')).toBeTruthy();
    });
  });
});
