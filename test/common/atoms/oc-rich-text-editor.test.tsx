import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcRichTextEditorComponent } from '../../../src/ui/common';

describe('Rich text format text editor', () => {
  const component: ShallowWrapper = shallow(
    <OcRichTextEditorComponent placeholderText="Default value" initialContent="" />,
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
