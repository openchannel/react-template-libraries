import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcDropdownButton, OcDropdownButtonProps } from '../../../packages/react-common-components/src/ui/common';
import './oc-dropdown-button.stories.scss';

export default {
	title: 'Dropdown Button',
	component: OcDropdownButton,
} as Meta;


const DropdownComponent: Story<OcDropdownButtonProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	})

	return (
		<OcDropdownButton {...args} onSelect={setSelected} selected={selected}>
			<div className="stories-dropdown-button__dropdown">
				{/* eslint-disable-next-line jsx-a11y/label-has-for */}
				<label className="stories-dropdown-button__dropdown-label">
					{selected.label}
				</label>
			</div>
		</OcDropdownButton>
	)
};

export const Dropdown = DropdownComponent.bind({});
Dropdown.args = {
	className: 'stories-dropdown-button',
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
