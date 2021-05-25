import * as React from 'react';
import moment from 'moment';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  OcTimePicker,
  TimepickerProps,
} from '../../../../src/ui/common/molecules/oc-datetime-picker/oc-timepicker/index';

const setUp = (props: TimepickerProps) => shallow(<OcTimePicker {...props} />);

describe('Time picker', () => {
  const component: ShallowWrapper = setUp({
    value: moment(),
    onChange: () => {},
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
