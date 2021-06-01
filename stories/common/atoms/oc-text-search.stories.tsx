import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcTextSearchComponent, TextSearchProps } from '../../../src/ui/common';

export default {
	title: 'Text Search Input [BEM]',
	component: OcTextSearchComponent,
} as Meta;

const InputComponent: Story<TextSearchProps> = (args) => {
	const [value, onChange] = React.useState('');
	return <OcTextSearchComponent {...args} value={value} onChange={onChange} />;
};

export const DefaultInput = InputComponent.bind({});
DefaultInput.args = {
	required: false,
	disabled: false,
	placeholder: 'Search',
};
