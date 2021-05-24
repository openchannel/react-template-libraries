import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { OcActivation, OcActivationProps } from '../../../src/ui/auth';


export default {
	title: 'User Activation',
	component: OcActivation,
} as Meta;

const Component: Story<OcActivationProps> = (args: OcActivationProps) => (
	<BrowserRouter>
		<OcActivation {...args} />
	</BrowserRouter>
);

export const Default = Component.bind({});
Default.args = {
	companyLogoUrl: './img/logo-company.png',
	inputProps: {
		id: 'input',
	}
};
