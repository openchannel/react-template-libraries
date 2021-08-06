import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import { SidebarProps } from '../../../packages/react-common-components/src/ui/index';
import OcSidebar from '../../../packages/react-common-components/src/ui/common/molecules/oc-sidebar';

export default {
	title: 'Sidebar [BEM]',
	component: OcSidebar,
} as Meta;

const SidebarComponent: Story<SidebarProps> = (args) => {
	return (
		<BrowserRouter>
			<OcSidebar {...args} />
		</BrowserRouter>
	);
};

export const OneLevel = SidebarComponent.bind({});
OneLevel.args = {
	title: 'App Category',
	sidebarModel: [
		{
			label: 'Category 1',
			checked: false,
			expanded: false,
		},
		{
			label: 'Category 2',
			checked: false,
			expanded: false,
		},
		{
			label: 'Category 3',
			checked: false,
			expanded: false,
		},
		{
			label: 'Category 4',
			checked: true,
			expanded: false,
		},
	],
	toggleIconDown: './img/select-down.svg',
	toggleIconUp: './img/select-up.svg',
	onClickSidebar: () => {},
};
