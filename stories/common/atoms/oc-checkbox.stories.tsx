import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcCheckboxComponent, CheckboxProps } from '../../../packages/react-common-components/src/ui/common';

export default {
  title: 'Checkbox [BEM]',
  component: OcCheckboxComponent,
} as Meta;

const InputCheckbox: Story<CheckboxProps> = (args) => <OcCheckboxComponent {...args} />;

export const RequiredCheckbox = InputCheckbox.bind({});
RequiredCheckbox.args = {
  labelText: 'Required Checkbox',
  required: true,
};
