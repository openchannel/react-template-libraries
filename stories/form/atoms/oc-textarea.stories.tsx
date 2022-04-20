import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcTextareaProps } from '../../../packages/react-common-components/src/ui/form';
import OcTextarea from '../../../packages/react-common-components/src/ui/form/atoms/oc-textarea/oc-textarea';

export default {
	title: 'Textarea',
	component: OcTextarea,
} as Meta;

const Component: Story<OcTextareaProps> = (args) => <OcTextarea {...args} />;

export const Default = Component.bind({});
Default.args = {
	placeholder: 'Type here',
};
