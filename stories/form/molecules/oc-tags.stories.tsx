import * as React from 'react';
import { useState } from '@storybook/addons';
import { Story, Meta } from '@storybook/react';

import { OcTagsProps, OcTagsValue } from '../../../packages/react-common-components/src/ui/form';
import OcTags from '../../../packages/react-common-components/src/ui/form/molecules/oc-tags/oc-tags';

export default {
	title: 'Tags',
	component: OcTags,
} as Meta;

const Component: Story<OcTagsProps> = (args) => {
	const [tags, setTags] = useState<OcTagsValue>([]);

	const onChange = (items: OcTagsValue) => {
		setTags(items);
	};

	return <OcTags {...args} value={tags} onChange={onChange} />;
};

export const Basic = Component.bind({});
Basic.args = {
	availableTags: ['item2', 'item3', 'item4', 'item5', 'item6', 'item7'],
};
