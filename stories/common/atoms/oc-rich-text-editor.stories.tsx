import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { OcRichTextEditorComponent, OcRtfProps } from '../../../packages/react-common-components/src/ui/common';

export default {
  title: 'Simple Rich Text Editor',
  component: OcRichTextEditorComponent,
} as Meta;

const Component: Story<OcRtfProps> = (args) => {
  const [value, setValue] = React.useState('');
  // React.useEffect(() => setValue(args.value ?? ''), [args.value]);
  return (
    <OcRichTextEditorComponent
      {...args}
      value={value}
      onChange={(newValue: string, _editor: any) => setValue(newValue)}
    />
  );
};

export const DefaultEditor = Component.bind({});
DefaultEditor.args = {
  initialValue: '',
  placeholderText: 'Default value',
};
