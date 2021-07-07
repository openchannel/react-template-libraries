import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcPasswordComponent, PasswordProps } from '../../../src/react-common-components/ui/common';

export default {
  title: 'Password [BEM]',
  component: OcPasswordComponent,
} as Meta;

const PasswordComponent: Story<PasswordProps> = (args) => <OcPasswordComponent {...args} />;

export const PasswordInput = PasswordComponent.bind({});
PasswordInput.args = {
  required: false,
  placeholder: 'Enter password',
};
