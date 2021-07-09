import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcRichTextEditorComponent } from '../../../packages/react-common-components/src/ui/common';

describe('Rich text format text editor', () => {
  const component: ShallowWrapper = shallow(
    <OcRichTextEditorComponent
      placeholderText="Default value"
      value=""
      onChange={undefined}
      initialValue=""
    />,
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
