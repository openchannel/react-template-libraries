import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { CheckboxProps } from '../../../packages/react-common-components/src/ui/common';
import OcCheckboxComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-checkbox';

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
