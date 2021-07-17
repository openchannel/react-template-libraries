import * as React from 'react';
import { useState } from '@storybook/addons';
import { Story, Meta } from '@storybook/react';

import { OcMultiSelectList, OcMultiSelectListProps } from '../../../packages/react-common-components/src/ui/form';


export default {
	title: 'Multi select list',
	component: OcMultiSelectList,
} as Meta;

const Component: Story<OcMultiSelectListProps> = (args) => {
	const [tags, setTags] = useState<string[]>([]);

	const onChange = (items: string[]) => {
		setTags(items);
	};

	return (
		<OcMultiSelectList
			{...args}
			value={tags}
			onChange={onChange}
		/>
	);
};

export const Basic = Component.bind({});
Basic.args = {
	availableItemsList: ['item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
	defaultItems: ['item1']
};
