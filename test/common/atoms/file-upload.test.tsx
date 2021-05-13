import * as React from 'react';
import enzyme, { mount, shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { OcFileUpload } from '../../../src/ui/common';

enzyme.configure({ adapter: new Adapter() });

const setUp = () => shallow(<OcFileUpload />);

describe('Default file uploader', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text value', () => {
    expect(component.contains('Browse file'));
  });

  it('Should click', async () => {
    const wrapper = mount(<OcFileUpload />);
    const dropzone = wrapper.find('input');
    dropzone.simulate('click');
    expect(dropzone).toHaveBeenCalled;
  });
});
