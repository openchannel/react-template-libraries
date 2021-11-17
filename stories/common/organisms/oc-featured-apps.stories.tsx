import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import {
	OcFeaturedAppsComponent,
	OcFeaturedAppsProps,
} from '../../../packages/react-common-components/src/ui/common/organisms/oc-featured-apps';

import { featuredApps } from './oc-featured-apps.mock';

const appList = featuredApps();

export default {
	title: 'Featured Apps [BEM]',
	component: OcFeaturedAppsComponent,
} as Meta;

const FeaturedApps: Story<OcFeaturedAppsProps> = (args) => {
	return (
		<BrowserRouter>
			<OcFeaturedAppsComponent
				data={args.data}
				label={args.label}
				emptyDataMessage={args.emptyDataMessage}
				customClass={args.customClass}
				mainRouterLink="/"
			/>
		</BrowserRouter>
	);
};

export const Empty = FeaturedApps.bind({});

Empty.args = {
	data: [],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};

export const SingleApp = FeaturedApps.bind({});

SingleApp.args = {
	data: [appList[0]],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};

export const SomeApps = FeaturedApps.bind({});

SomeApps.args = {
	data: [appList[0], appList[1]],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};

export const MaxApps = FeaturedApps.bind({});

MaxApps.args = {
	data: appList,
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};
