import * as React from 'react';
import { nanoid } from 'nanoid';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import { StatElement, FullAppData } from '../../../src/ui/common/models';
import { OcAppGallery, OcAppGalleryProps } from '../../../src/ui/market';

export default {
	title: 'App Gallery',
	component: OcAppGallery,
} as Meta;

const stat: StatElement = {
	'90day': 10,
	'30day': 20,
	total: 20
};

const app: FullAppData = {
	appId: nanoid(),
	icon: '',
	name: 'Test App',
	model: [{
		type: 'recurring',
		price: 5,
		trial: 1,
		license: 'single',
		modelId: '23235hfg4',
		currency: 'EUR',
		billingPeriod: 'monthly'
	}],
	rating: 4.2,
	reviewCount: 20,
	summary: 'Some test summary',
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
		reason: ''
	},
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat
	},
	isLive: true
};

const cloneApp = () => ({ ...app, appId: nanoid() });

const app1 = cloneApp();
const app2 = cloneApp();
app2.description = 'Integrate directly with your account and make customer updates a breeze';
app2.logo = './img/get-started.svg';
app2.name = 'Application';
app2.model[0].price = 11.99;
app2.rating = 0;
app2.reviewCount = 0;

const app3 = cloneApp();
app3.description = 'With this plugin you can communicate with your teammates any time';
app3.logo = './img/get-started.svg';
app3.name = 'Plugin';
app3.model[0].price = 0;
app3.model[0].type = 'free';
app3.rating = 3.5;
app3.reviewCount = 12;

const app4 = cloneApp();
app4.description = 'Improve and extend your experience right from your own UI';
app4.logo = './img/get-started.svg';
app4.name = 'Integration';
app4.model[0].price = 4.99;
app4.rating = 4.9;
app4.reviewCount = 87;

const Component: Story<OcAppGalleryProps> = (args) => (
	<BrowserRouter>
		<OcAppGallery {...args} />
	</BrowserRouter>
);

export const RecentlyAddedEmpty = Component.bind({});
RecentlyAddedEmpty.args = {
	noAppMessage: 'No App Found',
	appGalleryTitle: 'Recently Added',
	appGalleryDescription: 'The latest apps that help you team work and build faster',
	appsArr: [],
	onAppClick: action('onAppClick'),
};

export const RecentlyAddedSome = Component.bind({});
RecentlyAddedSome.args = {
	noAppMessage: 'No App Found',
	appGalleryTitle: 'Recently Added',
	appGalleryDescription: 'The latest apps that help you team work and build faster',
	appsArr: [app1, app2, app3],
	seeAllUrl: '',
	onAppClick: action('onAppClick'),
};

export const RecentlyAddedMax = Component.bind({});
RecentlyAddedMax.args = {
	noAppMessage: 'No App Found',
	appGalleryTitle: 'Recently Added',
	appGalleryDescription: 'The latest apps that help you team work and build faster',
	appsArr: [app1, app2, app3, app4],
	seeAllUrl: '',
	onAppClick: action('onAppClick'),
};

export const MostPopular = Component.bind({});
MostPopular.args = {
	noAppMessage: 'No App Found',
	appGalleryTitle: 'Most Popular',
	appGalleryDescription: 'The most used apps that help you and your team get more done',
	appsArr: [app1, app2, app3, app4, app1, app2],
	seeAllUrl: '',
	onAppClick: action('onAppClick'),
};

export const AppsForAnalytics = Component.bind({});
AppsForAnalytics.args = {
	noAppMessage: 'No App Found',
	appGalleryTitle: 'Apps for Analytics',
	appGalleryDescription: 'Get insights and analytics to make the better decisions',
	appsArr: [app1, app2, app3, app4, app1, app2],
	seeAllUrl: '',
	onAppClick: action('onAppClick'),
};
