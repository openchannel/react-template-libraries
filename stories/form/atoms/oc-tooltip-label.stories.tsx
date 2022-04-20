import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import OcInputComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-input';
import { OcTooltipLabelProps } from '../../../packages/react-common-components/src/ui/form';
import OcTooltipLabel from '../../../packages/react-common-components/src/ui/form/atoms/oc-tooltip-label/oc-tooltip-label';

export default {
	title: 'Label with tooltip',
	component: OcTooltipLabel,
} as Meta;

const Component: Story<OcTooltipLabelProps> = (args) => <OcTooltipLabel {...args} />;

export const Default = Component.bind({});
Default.args = {
	text: 'Email',
	description: 'Enter your email address.',
};

const LabelWithInputComponent: Story<OcTooltipLabelProps> = (args) => (
	<>
		<OcTooltipLabel {...args} htmlFor="input-email" />
		<OcInputComponent inputType="email" id="input-email" />
	</>
);

export const LabelWithInput = LabelWithInputComponent.bind({});
LabelWithInput.args = {
	text: 'Email',
	description: 'Enter your email address.',
	required: true,
};
