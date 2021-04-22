import * as React from 'react';
import enzyme, { mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { Password, PasswordProps } from '../../../src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultPasswordProps: PasswordProps = {
  text: 'Test password',
  required: false,
  inputType: 'password',
  disabled: false,
  placeholder: 'default value',
};

const setUp = (props: PasswordProps) => shallow(<Password {...props} />);

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
    const wrapper = mount(<Password />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Hello' } });
    expect(input.contains('Hello'));
  });
});
