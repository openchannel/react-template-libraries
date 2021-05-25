import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcInputComponent, InputProps } from '../../../src/ui/common';

export default {
  title: 'Input [BEM]',
  component: OcInputComponent,
} as Meta;

const InputComponent: Story<InputProps> = (args) => <OcInputComponent {...args} />;

export const DefaultInput = InputComponent.bind({});
DefaultInput.args = {
  required: false,
  inputType: 'text',
};
