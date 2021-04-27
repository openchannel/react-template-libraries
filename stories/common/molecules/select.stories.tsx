import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Select, SelectProps } from '../../../src/ui/common';


export default {
	title: 'Common/Molecules/Select',
	component: Select,
} as Meta;


const SelectComponent: Story<SelectProps> = (args) => <Select {...args} />;

export const DefaultSelect = SelectComponent.bind({});
DefaultSelect.args = {
	selectValArr: ['Assembly', 'Communication'],

};
DefaultSelect.storyName = 'Simple Select';
