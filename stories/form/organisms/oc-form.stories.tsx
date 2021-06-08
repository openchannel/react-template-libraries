import * as React from 'react';
import { useState } from '@storybook/addons';
import { Story, Meta } from '@storybook/react';

import { OcForm } from '../../../src/ui/form';


export default {
	title: 'Form group component',
	component: OcForm,
} as Meta;

const Component: Story<any> = (args) => {
	const [tags, setTags] = useState<any>([]);

	// const onChange = (items: OcTagsValue) => {
	// 	setTags(items);
	// };

	return (
		<OcForm
			{...args}
			// value={tags}
			// onChange={onChange}
		/>
	);
};

export const Default = Component.bind({});
Default.args = {
	// availableTags: ['item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
};
