import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { InputWithIcon } from '../../../../src/ui/common/molecules/oc-datetime-picker/icon-input';

describe('Date input with calendar icon', () => {
  const component: ShallowWrapper = shallow(<InputWithIcon />);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
