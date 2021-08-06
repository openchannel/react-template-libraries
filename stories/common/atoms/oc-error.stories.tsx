import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcErrorProps } from '../../../packages/react-common-components/src/ui/common';
import OcError from '../../../packages/react-common-components/src/ui/common/atoms/oc-error/oc-error';

export default {
	title: 'Error',
	component: OcError,
} as Meta;

const Component: Story<OcErrorProps> = (args) => <OcError {...args} />;

export const Default = Component.bind({});
Default.args = {
	message: 'Field should be not empty.',
};
