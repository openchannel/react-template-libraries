import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcRichTextEditorComponent } from '@openchannel/react-common-components';

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
