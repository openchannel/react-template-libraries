import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { TextSearchProps } from '../../../packages/react-common-components/src/ui/common';
import OcTextSearchComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-text-search';

export default {
	title: 'Text Search Input [BEM]',
	component: OcTextSearchComponent,
} as Meta;

const SearchComponent: Story<TextSearchProps> = (args) => {
	const [value, onChange] = React.useState('');
	const enterAction = () => {};
	return (
		<OcTextSearchComponent {...args} value={value} onChange={onChange} enterAction={enterAction} />
	);
};

export const SimpleSearch = SearchComponent.bind({});
SimpleSearch.args = {
	required: false,
	disabled: false,
	placeholder: 'Search',
	hasMagnifier: true,
	hasClearTextControl: false,
};

export const SearchWithButtons = SearchComponent.bind({});
SearchWithButtons.args = {
	required: false,
	disabled: false,
	placeholder: 'Search',
	hasMagnifier: false,
	hasClearTextControl: true,
	searchButtonText: 'Search',
	clearButtonText: 'Cancel',
};
