import * as React from 'react';
import { useState } from '@storybook/addons';
import { Story, Meta } from '@storybook/react';

import { OcTags, OcTagsProps, OcTagsValue } from '../../../src/ui/form';


export default {
	title: 'Tags',
	component: OcTags,
} as Meta;

const Component: Story<OcTagsProps> = (args) => {
	const [tags, setTags] = useState<OcTagsValue>([]);

	const onChange = (items: OcTagsValue) => {
		setTags(items);
	};

	return (
		<OcTags
			{...args}
			value={tags}
			onChange={onChange}
		/>
	);
};

export const Basic = Component.bind({});
Basic.args = {
	availableTags: ['item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
};
