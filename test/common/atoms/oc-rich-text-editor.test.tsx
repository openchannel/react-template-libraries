import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcRichTextEditorComponent } from '../../../src/ui/common';

describe('Input content for replacing mockups in dropzone library', () => {
  const component: ShallowWrapper = shallow(<OcRichTextEditorComponent />);

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
