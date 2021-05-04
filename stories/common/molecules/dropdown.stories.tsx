import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Dropdown, DropdownProps } from '../../../src/ui/common';


export default {
	title: 'Common/Molecules/Dropdown',
	component: Dropdown,
} as Meta;


const DropdownComponent: Story<DropdownProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	})

	return (
		<Dropdown {...args} onSelect={setSelected} selected={selected} />
	)
};

export const SimpleDropdown = DropdownComponent.bind({});
SimpleDropdown.args = {
	title: 'Sort by',
	options: [
		{
			label: 'popular',
			value: 'popular',
		},
		{
			label: 'newest',
			value: 'newest',
		},
		{
			label: 'featured',
			value: 'featured',
		}
	],
};


const BlockDropdownComponent: Story<DropdownProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	})

	return (
		<Dropdown {...args} onSelect={setSelected} selected={selected}>
			<div style={{ width: '100%', border: '1px solid #c9d5ea', borderRadius: 4 }}>
				selected value {selected.label}
			</div>
		</Dropdown>
	)
};

export const BlockDropdown = BlockDropdownComponent.bind({});
BlockDropdown.args = {
	type: 'block',
	minDropdownWidth: 247,
	options: [
		{
			label: 'popular',
			value: 'popular',
		},
		{
			label: 'newest',
			value: 'newest',
		},
		{
			label: 'featured',
			value: 'featured',
		}
	],
};
