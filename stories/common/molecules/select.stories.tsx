import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Select, SelectProps, SelectedValue } from '../../../src/ui/common';


export default {
	title: 'Common/Molecules/Select',
	component: Select,
} as Meta;


const SelectComponent: Story<SelectProps> = (args) => {
	const [selected, setSelected] = React.useState<SelectedValue>(args.value)

	return (
		<Select {...args} onSelectionChange={setSelected} value={selected} />
	)
};

export const SimpleSelect = SelectComponent.bind({});
SimpleSelect.args = {
	selectValArr: ['Assembly', 'Communication'],
};

export const ObjectSelect = SelectComponent.bind({});
ObjectSelect.args = {
	selectValArr: [{ label: '1' }, { label: '2' }],
	labelField: 'label',
};

export const SelectWithValue = SelectComponent.bind({});
SelectWithValue.args = {
	selectValArr: [{ key: '1' }, { key: '2' }],
	labelField: 'key',
	value: { key: '1' },
};
SelectWithValue.storyName = 'Selected object value';
