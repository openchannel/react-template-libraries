import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcDropdownProps } from '../../../packages/react-common-components/src/ui/common';
import OcDropdown from '../../../packages/react-common-components/src/ui/common/molecules/oc-dropdown/oc-dropdown';

export default {
	title: 'Dropdown',
	component: OcDropdown,
} as Meta;

const DropdownComponent: Story<OcDropdownProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	});

	return <OcDropdown {...args} onSelect={setSelected} selected={selected} />;
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
		},
	],
};
SimpleDropdown.storyName = 'Dropdown';
