import * as React from 'react';
import enzyme, { /*mount,*/ shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { OcDropboxComponent, DropboxProps } from '../../../src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultDropboxProps: DropboxProps = {
  placeholder: 'Default placeholder',
  items: [
    {
      label: 'first',
      value: 'first',
    },
    {
      label: 'second',
      value: 'second',
    },
    {
      label: 'third',
      value: 'third',
    },
  ],
  className: 'oc-dropbox',
  classNamePrefix: 'oc-dropbox',
  isSearchable: true,
  clearFormAfterSelect: false,
  style: {},
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
});
