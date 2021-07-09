import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcSidebar, SidebarProps } from '../../../src/ui/common';

export default {
	title: 'Sidebar [BEM]',
	component: OcSidebar,
} as Meta;

const SidebarComponent: Story<SidebarProps> = (args) => {
	return <OcSidebar {...args} />;
};

export const OneLevel = SidebarComponent.bind({});
OneLevel.args = {
	title: 'App Category',
	sidebarModel: [
		{
			label: 'Category 1',
			checked: false,
		},
		{
			label: 'Category 2',
			checked: false,
		},
		{
			label: 'Category 3',
			checked: false,
			expanded: false,
		},
		{
			label: 'Category 4',
			checked: true,
		},
	],
};
