import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Password, PasswordProps } from '../../../src/ui/common';

export default {
  title: 'Password [BEM]',
  component: Password,
} as Meta;

const PasswordComponent: Story<PasswordProps> = (args) => <Password {...args} />;

export const PasswordInput = PasswordComponent.bind({});
PasswordInput.args = {
  required: false,
  inputType: 'password',
  placeholder: 'Enter password',
};
