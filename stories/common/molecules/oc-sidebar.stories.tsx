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
	const [selectedCategory, setSelectedCategory] = React.useState({ parent: {} });

	return (
		<BrowserRouter>
			<OcSidebar
				{...args}
				onClickSidebar={setSelectedCategory}
				selectedCategory={selectedCategory}
			/>
		</BrowserRouter>
	);
};

export const OneLevel = SidebarComponent.bind({});
OneLevel.args = {
	title: 'Collections',
	sidebarModel: [
		{
			id: 'allApps',
			label: 'All Apps',
			description: 'All applications are listed here.',
			query: '{"status.value":"approved"}',
			values: [],
		},
		{
			id: 'featured',
			label: 'Featured',
			sort: '{"randomize":1}',
			query: '{"status.value":"approved","attributes.featured":"yes"}',
			values: [],
		},
		{
			id: 'popular',
			label: 'Popular',
			sort: '{"statistics.views.90day": -1, "randomize":1}',
			query: '{"status.value":"approved"}',
			values: [],
		},
		{
			id: 'newest',
			label: 'Newest',
			sort: '{"created": -1}',
			query: '{"status.value":"approved"}',
			values: [],
		},
	],
	toggleIconDown: './img/select-down.svg',
	toggleIconUp: './img/select-up.svg',
};
