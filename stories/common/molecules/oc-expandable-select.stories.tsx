import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcExpandableSelect, ExpandSelectProps } from '../../../src/ui/common';

export default {
	title: 'Expandable Select [BEM]',
	component: OcExpandableSelect,
} as Meta;

let selectModels = [
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
	const onChange = React.useCallback(
		(e) => {
			console.log(selectModels[e.target.name].checked);
			return (selectModels[e.target.name].checked = !selectModels[e.target.name].checked);
		},
		[selectModels],
	);
	return (
		<OcExpandableSelect
			{...args}
			title={args.title}
			toggle={toggle}
			isCollapsed={isCollapsed}
			selectModels={args.selectModels}
			onChange={onChange}
		/>
	);
};

export const CollapsedSelect = SelectComponent.bind({});
CollapsedSelect.args = {
	title: 'App Category',
	selectModels: selectModels,
	isCollapsed: true,
};

export const ExpandedSelect = SelectComponent.bind({});
ExpandedSelect.args = {
	title: 'App Category',
	selectModels: selectModels,
	isCollapsed: false,
};
