import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcExpandableSelect, ExpandSelectProps } from '../../../src/ui/common';

export default {
	title: 'Expandable Select [BEM]',
	component: OcExpandableSelect,
} as Meta;

const selectModels = [
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
	},
	{
		label: 'Category 4',
		checked: true,
	},
];

const SelectComponent: Story<ExpandSelectProps> = (args) => {
	const [isCollapsed, toggle] = React.useState(args.isCollapsed);
	const [items, handleChange] = React.useState(args.selectModels);

	return (
		<OcExpandableSelect
			{...args}
			title={args.title}
			toggle={toggle}
			isCollapsed={isCollapsed}
			onChange={handleChange}
			selectModels={items}
		/>
	);
};

export const CollapsedSelect = SelectComponent.bind({});
CollapsedSelect.args = {
	title: 'App Category',
	selectModels: selectModels,
	isCollapsed: true,
	collapsedIconLink: './img/select-down.svg',
	expandedIconLink: './img/select-up.svg',
};

export const ExpandedSelect = SelectComponent.bind({});
ExpandedSelect.args = {
	title: 'App Category',
	selectModels: selectModels,
	isCollapsed: false,
	collapsedIconLink: './img/select-down.svg',
	expandedIconLink: './img/select-up.svg',
};
