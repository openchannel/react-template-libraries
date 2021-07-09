import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcButtonComponent, ButtonProps } from '@openchannel/react-common-components';

const defaultButtonProps: Partial<ButtonProps> = {
  htmlType: 'button',
  text: 'Test button',
  type: 'primary',
  disabled: false,
};

const setUp = (props: Partial<ButtonProps>) => shallow(<OcButtonComponent {...props} />);

describe('Button (common button)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultButtonProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text value', () => {
    expect(component.text()).toEqual('Test button');
  });

  it('should contain style variant value and exist', async () => {
    component.setProps({ type: 'secondary' });

    const classExist = component.hasClass('oc-button_secondary');

    expect(classExist).toBeTruthy();
  });

  it('should not contain any variants', async () => {
    component.setProps({ type: 'none' });

    const classExist = component.hasClass('oc-button');

    expect(classExist).toBeTruthy();
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

  it('should render with custom children', async () => {
    component.setProps({ children: React.createElement('span', null, 'custom children') });

    expect(component.contains(<span>custom children</span>)).toBeTruthy();
  });

  it('should render with process', async () => {
    component.setProps({ process: true });

    expect(component.find('.oc-button__spinner')).toBeTruthy();
  });
});
