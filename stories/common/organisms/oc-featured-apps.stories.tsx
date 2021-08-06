import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

import { FeaturedAppsProps } from '../../../packages/react-common-components/src/ui/common';
import OcFeaturedAppsComponent from '../../../packages/react-common-components/src/ui/common/organisms/oc-featured-apps';

export default {
	title: 'Featured Apps [BEM]',
	component: OcFeaturedAppsComponent,
} as Meta;

const statElement = {
	'90day': 20,
	'30day': 10,
	total: 20,
};

const featuredApp = {
	appId: '34343-jjo-sgs-353-fgi-3423',
	icon: './img/get-started.svg',
	logo: './img/get-started.svg',
	name: 'Test App 1',
	model: [
		{
			type: 'recurring',
			price: 5,
			trial: 1,
			license: 'single',
			modelId: '23235hfg4',
			currency: 'EUR',
			billingPeriod: 'monthly',
		},
	],
	rating: 4.2,
	reviewCount: 20,
	summary: '',
	description: 'With this plugin you can collaborate with teammates at any time.',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: 'approved',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	statistics: {
		views: statElement,
		downloads: statElement,
		developerSales: statElement,
		totalSales: statElement,
		ownerships: statElement,
		reviews: statElement,
	},
	isLive: true,
};

const FeaturedApps: Story<FeaturedAppsProps> = (args) => {
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
	data: [featuredApp],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};

export const SomeApps = FeaturedApps.bind({});

SomeApps.args = {
	data: [featuredApp, featuredApp],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};

export const MaxApps = FeaturedApps.bind({});

MaxApps.args = {
	data: [featuredApp, featuredApp, featuredApp, featuredApp],
	label: 'Featured',
	emptyDataMessage: 'No Featured App',
};
