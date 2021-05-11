import * as React from 'react';
import enzyme, { mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { OcColorComponent, ColorProps } from '../../../src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultColorProps: ColorProps = {
  placeholder: 'Enter color value here',
  disabled: false,
  style: {},
};

const setUp = (props: ColorProps) => shallow(<OcColorComponent {...props} />);

describe('Basic Color Input', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultColorProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an exact placeholder', () => {
    const wrapper = mount(<OcColorComponent {...defaultColorProps} />);
    expect(wrapper.prop('placeholder')).toEqual('Enter color value here');
  });

  it('should click on colorpicker', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<OcColorComponent {...defaultColorProps} onClick={mockCallback} />);
    wrapper.find('.color-adjust__picker-input').simulate('change', { target: { value: '#AAA' } });
    expect(wrapper.find('.color-adjust__picker-input').props().value).toEqual('#AAA');
  });
});
