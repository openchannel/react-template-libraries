import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { StatElement, FullAppData } from '../../../src/ui/common/models';
import { OcAppListGrid, OcAppListGridProps } from '../../../src/ui/market';

export default {
	title: 'App List Grid',
	component: OcAppListGrid,
} as Meta;

const stat: StatElement = {
	'90day': 10,
	'30day': 20,
	total: 20
};

const app1: FullAppData = {
	appId: '344gf-43s3j-gi3423',
	icon: '',
	name: 'Plugin',
	model: [
		{
			type: 'free',
			price: 0,
			trial: 1,
			license: 'single',
			modelId: '23235hfg4',
			currency: 'EUR',
			billingPeriod: 'monthly',
		},
	],
	rating: 3.5,
	reviewCount: 12,
	summary: 'With this plugin you can communicate with your teammates any time',
	description: 'With this plugin you can communicate with your teammates any time',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: 'pending',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat,
	},
	isLive: true,
};

const app2: FullAppData = {
	appId: '343344gf-43s3j-gi3423',
	icon: '',
	name: 'Application',
	model: [
		{
			type: 'recurring',
			price: 11.99,
			trial: 1,
			license: 'single',
			modelId: '23235hfg4',
			currency: 'EUR',
			billingPeriod: 'monthly',
		},
	],
	rating: 2.4,
	reviewCount: 2,
	summary: 'Integrate directly with your account and make customer updates a breeze',
	description: 'Integrate directly with your account and make customer updates a breeze',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: 'pending',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat,
	},
	isLive: true,
};

const app3: FullAppData = {
	appId: '34ks344gf-43s3j-gi3423',
	icon: '',
	name: 'Plugin',
	model: [
		{
			type: 'free',
			price: 11.99,
			trial: 1,
			license: 'single',
			modelId: '23235hfg4',
			currency: 'EUR',
			billingPeriod: 'monthly',
		},
	],
	rating: 3.5,
	reviewCount: 12,
	summary: 'With this plugin you can communicate with your teammates any time',
	description: 'With this plugin you can communicate with your teammates any time',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: 'pending',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat,
	},
	isLive: true,
};

const app4: FullAppData = {
	appId: '35-344gf-43s3j-gi3423',
	icon: '',
	name: 'Integration',
	model: [
		{
			type: 'single',
			price: 5.99,
			trial: 1,
			license: 'single',
			modelId: '23235hfg4',
			currency: 'EUR',
			billingPeriod: 'monthly',
		},
	],
	rating: 4.9,
	reviewCount: 87,
	summary: 'Integrate directly with your account and make customer updates a breeze',
	description: 'Integrate directly with your account and make customer updates a breeze',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: 'pending',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat,
	},
	isLive: true,
};

const Component: Story<OcAppListGridProps> = (args) => (
	<BrowserRouter>
		<OcAppListGrid {...args} />
	</BrowserRouter>
);

export const EmptyGrid = Component.bind({});
EmptyGrid.args = {
	appList: [],
	noAppMessage: 'No App Found',
};

export const GridWithApps = Component.bind({});
GridWithApps.args = {
	appList: [app1, app2, app3, app4],
	noAppMessage: 'No App Found',
};
