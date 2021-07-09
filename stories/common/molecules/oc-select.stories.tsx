import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcSelect, OcSelectProps, SelectedValue } from '../../../packages/react-common-components/src/ui/common';


export default {
	title: 'Select',
	component: OcSelect,
} as Meta;


const SelectComponent: Story<OcSelectProps> = (args) => {
	const [selected, setSelected] = React.useState<SelectedValue>(args.value)

	return (
		<OcSelect {...args} onSelectionChange={setSelected} value={selected} />
	)
};

export const SimpleSelect = SelectComponent.bind({});
SimpleSelect.args = {
	selectValArr: ['Assembly', 'Communication'],
	placeholder: 'Select',
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
