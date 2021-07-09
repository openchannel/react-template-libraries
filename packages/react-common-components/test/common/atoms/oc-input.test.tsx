import * as React from 'react';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { OcInputComponent, InputProps } from '../../../packages/react-common-components/src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultInputProps: InputProps = {
  value: 'Test input',
  required: false,
  inputType: 'text',
  disabled: false,
  placeholder: 'default value',
};

const setUp = (props: InputProps) => shallow(<OcInputComponent {...props} />);

describe('Default text input', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultInputProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text value', () => {
    expect(component.prop('placeholder')).toEqual('default value');
  });

  it('should contain required prop and be true', async () => {
    component.setProps({ required: true });

    expect(component.prop('required')).toBeTruthy();
  });

  it('button should be disabled', async () => {
    component.setProps({ disabled: true });

    expect(component.prop('disabled')).toBeTruthy();
  });

  it('should click', async () => {
    const onButtonClickMock = jest.fn();

    component.setProps({ onClick: onButtonClickMock });
    component.simulate('click');

    expect(onButtonClickMock).toHaveBeenCalledTimes(1);
  });
});
