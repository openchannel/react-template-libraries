import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcRichTextEditorComponent } from '../../../src/ui/common';

export default {
  title: 'Simple Rich Text Editor',
  component: OcRichTextEditorComponent,
} as Meta;

const Component: Story<any> = (args) => <OcRichTextEditorComponent {...args} />;

export const DefaultEditor = Component.bind({});
DefaultEditor.args = {};
