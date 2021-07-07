import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcInputComponent } from '../../../src/react-common-components/ui/common';
import { OcTooltipLabel, OcTooltipLabelProps } from '../../../src/react-common-components/ui/form';

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
		<OcTooltipLabel
			{...args}
			htmlFor="input-email"
		/>
		<OcInputComponent
			inputType="email"
			id="input-email"
		/>
	</>
);

export const LabelWithInput = LabelWithInputComponent.bind({});
LabelWithInput.args = {
	text: 'Email',
	description: 'Enter your email address.',
	required: true,
};
