import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcDropdownButton, OcDropdownButtonProps } from '../../../src/ui/common';


export default {
	title: 'Common/Molecules/Dropdown Button',
	component: OcDropdownButton,
} as Meta;


const DropdownComponent: Story<OcDropdownButtonProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	})

	return (
		<OcDropdownButton {...args} onSelect={setSelected} selected={selected}>
			<div style={{ width: '100%', border: '1px solid #c9d5ea', borderRadius: 4 }}>
				selected value {selected.label}
			</div>
		</OcDropdownButton>
	)
};

export const Dropdown = DropdownComponent.bind({});
Dropdown.args = {
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
Dropdown.storyName = 'Dropdown Button';
