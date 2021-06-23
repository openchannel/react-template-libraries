import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcAppDescription, AppDescriptionProps } from '../../../src/ui/common/molecules';

export default {
	title: 'App Description [BEM]',
	component: OcAppDescription,
} as Meta;

const AppDescription: Story<AppDescriptionProps> = (args) => {
	return <OcAppDescription {...args} />;
};

export const ExpandableDescription = AppDescription.bind({});
ExpandableDescription.args = {
	truncateTextLength: 250,
	appDescription:
		'<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. <br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam. <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique. <br>Phasellus id nulla id dolor sagittis placerat. <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis. <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>',
	header: 'About App',
	showFullDescription: false,
	shortDescription: false,
};

export const FullDescription = AppDescription.bind({});
FullDescription.args = {
	truncateTextLength: 250,
	appDescription:
		'<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. <br>Proin aliquam libero eget tellus pharetra posuere. Praesent accumsan ipsum quam. <br> Suspendisse potenti. Maecenas id posuere dui, in semper urna. Sed mattis nec mauris eget tristique. <br>Phasellus id nulla id dolor sagittis placerat. <br>Aliquam posuere, magna sit amet vehicula posuere, elit purus facilisis elit, in lacinia enim diam consequat felis. <br>Nullam scelerisque in elit vitae feugiat. Nunc mattis eros leo, at finibus lacus ornare nec. Nulla facilisi.</p>',
	header: 'About App',
	showFullDescription: true,
	enableTruncateTextLogic: false,
	shortDescription: true,
};

export const ShortDescription = AppDescription.bind({});
ShortDescription.args = {
	truncateTextLength: 250,
	appDescription:
		'<p> Nulla ut cursus mi. Nullam mi lacus, porttitor a sapien quis, scelerisque vestibulum massa.<br> Phasellus tincidunt est eget fermentum dictum. Morbi consequat sed risus a maximus. <br>Proin aliquam libero eget tellus pharetra posuere. </p>',
	header: 'About App',
	showFullDescription: true,
	shortDescription: true,
	enableTruncateTextLogic: true,
	isFullDescription: false,
};
