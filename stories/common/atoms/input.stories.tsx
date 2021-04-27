import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Input, InputProps } from '../../../src/ui/common';

export default {
  title: 'Input [BEM]',
  component: Input,
} as Meta;

const InputComponent: Story<InputProps> = (args) => <Input {...args} />;

export const DefaultInput = InputComponent.bind({});
DefaultInput.args = {
  required: false,
  inputType: 'text',
};
