import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcFeaturedAppsComponent, FeaturedAppsProps } from '../../../src/ui/common';

export default {
	title: 'Featured Apps [BEM]',
	component: OcFeaturedAppsComponent,
} as Meta;

const FeaturedApps: Story<FeaturedAppsProps> = (args) => {

	return (
	
	);
};

export const Empty = FeaturedApps.bind({});
Empty.args = {
};
export const SingleApp = FeaturedApps.bind({});
SingleApp.args = {
};
export const SomeApp = FeaturedApps.bind({});
SomeApp.args = {
};
export const MaxApps = FeaturedApps.bind({});
MaxApps.args = {
};
