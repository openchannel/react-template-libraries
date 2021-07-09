import * as React from 'react';
import enzyme, { mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { OcDropboxComponent, DropboxProps, DropboxValue } from '../../../packages/react-common-components/src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultDropboxProps: DropboxProps = {
  placeholder: 'Default placeholder',
  items: ['first', 'second', 'third'],
  className: 'oc-dropbox',
  classNamePrefix: 'oc-dropbox',
  isSearchable: true,
  disabled: false,
  selectedItem: 'first',
  selectItem: (item: DropboxValue): DropboxValue => item,
};

const setUp = (props: DropboxProps) => shallow(<OcDropboxComponent {...props} />);

describe('OcDropboxComponent', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultDropboxProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain placeholder', () => {
    expect(component.prop('placeholder')).toEqual('Default placeholder');
  });

  it('should contain 3 options and be clicked', () => {
    const wrapper = mount(<OcDropboxComponent {...defaultDropboxProps} />);
    wrapper.find('svg').simulate('mouseDown', {
      button: 0,
    });
    expect(wrapper.find('.oc-dropbox__option').length).toEqual(6);
  });
});
