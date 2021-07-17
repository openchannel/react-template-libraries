import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcTextarea, OcTextareaProps } from '../../../packages/react-common-components/src/ui/form';

export default {
	title: 'Textarea',
	component: OcTextarea,
} as Meta;

const Component: Story<OcTextareaProps> = (args) => <OcTextarea {...args} />;

export const Default = Component.bind({});
Default.args = {
	placeholder: 'Type here',
};
