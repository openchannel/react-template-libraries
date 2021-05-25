import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcRichTextEditorComponent } from '../../../src/ui/common';

describe('Rich text format text editor', () => {
  const component: ShallowWrapper = shallow(
    <OcRichTextEditorComponent placeholderText="Default value" value="" onChange={()=>void} />,
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
