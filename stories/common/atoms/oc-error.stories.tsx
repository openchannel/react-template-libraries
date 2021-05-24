import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcError, OcErrorProps } from '../../../src/ui/common';


export default {
	title: 'Error',
	component: OcError,
} as Meta;

const Component: Story<OcErrorProps> = (args) => <OcError {...args} />;

export const Default = Component.bind({});
Default.args = {
	message: 'Field should be not empty.'
};
