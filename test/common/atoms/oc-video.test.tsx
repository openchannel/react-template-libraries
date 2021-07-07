import * as React from 'react';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import { OcVideoComponent, VideoProps } from '../../../src/react-common-components/ui/common';

enzyme.configure({ adapter: new Adapter() });

const defaultVideoProps: VideoProps = {
  videoUrl: 'https://www.youtube.com/embed/DGQwd1_dpuc',
};

const setUp = (props: VideoProps) => shallow(<OcVideoComponent {...props} />);

describe('Embedded iframe video', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultVideoProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain video url', () => {
    expect(component.contains('https'));
  });
});
