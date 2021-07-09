import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { InputContent } from '../../../../packages/react-common-components/src/ui/common/atoms/oc-file-upload/input-content';

describe('Input content for replacing mockups in dropzone library', () => {
  const component: ShallowWrapper = shallow(<InputContent />);

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain text value in child', () => {
    const p = component.find('p');
    expect(p.text()).toEqual('Drag & drop file or Browse File');
  });
});
