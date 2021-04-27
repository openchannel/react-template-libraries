import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Checkbox, CheckboxProps } from '../../../src/ui/common';

export default {
  title: 'Checkbox [BEM]',
  component: Checkbox,
} as Meta;

const InputCheckbox: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const RequiredCheckbox = InputCheckbox.bind({});
RequiredCheckbox.args = {
  labelText: 'Required Checkbox',
  required: true,
};
