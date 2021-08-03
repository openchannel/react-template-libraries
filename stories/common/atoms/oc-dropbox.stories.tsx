import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	DropboxProps,
	DropboxValue,
} from '../../../packages/react-common-components/src/ui/common';
import OcDropboxComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-dropbox';

export default {
	title: 'Dropbox search [BEM]',
	component: OcDropboxComponent,
	disabled: false,
} as Meta;

const DropboxComponent: Story<DropboxProps> = (args) => {
	const [selectedItem, setSelectedItem] = React.useState<DropboxValue>(null);
	return <OcDropboxComponent {...args} selectedItem={selectedItem} selectItem={setSelectedItem} />;
};

export const DefaultDropbox = DropboxComponent.bind({});
DefaultDropbox.args = {
	placeholder: 'Default placeholder',
	items: ['first', 'second', 'third'],
	disabled: false,
};
export const ScrollDropbox = DropboxComponent.bind({});
ScrollDropbox.args = {
	placeholder: 'Default placeholder',
	items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
	disabled: false,
};
export const EmptyDropbox = DropboxComponent.bind({});
EmptyDropbox.args = {
	placeholder: '',
	items: [],
	disabled: false,
};
