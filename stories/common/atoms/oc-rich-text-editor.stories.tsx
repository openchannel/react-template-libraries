import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcRichTextEditorComponent, OcRtfProps } from '../../../src/ui/common';

export default {
  title: 'Simple Rich Text Editor',
  component: OcRichTextEditorComponent,
} as Meta;

const Component: Story<OcRtfProps> = (args) => <OcRichTextEditorComponent {...args} />;

export const DefaultEditor = Component.bind({});
DefaultEditor.args = {
  initialContent: '',
  placeholderText: 'Default value',
};
