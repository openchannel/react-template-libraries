import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcDropdown, OcDropdownProps } from '../../../src/ui/common';


export default {
	title: 'Common/Molecules/Dropdown',
	component: OcDropdown,
} as Meta;


const DropdownComponent: Story<OcDropdownProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	})

	return (
		<OcDropdown {...args} onSelect={setSelected} selected={selected} />
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
SimpleDropdown.storyName = 'Dropdown';
