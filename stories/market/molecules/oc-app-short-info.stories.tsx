import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { OcAppShortInfo, OcAppShortInfoProps, FullAppData } from '../../../src/ui/market';


const stat = {
	'90day': 10,
	'30day': 20,
	total: 30
};

export const appData: FullAppData = {
	appId: '123',
	summary: '<div>summary summary<span>r u sure about that</span>?</div>',
	created: new Date(),
	developerId: '321',
	isLive: false,
	lastUpdated: new Date(),
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
	name: 'Test Test',
	reviewCount: 1,
	safeName: [],
	statistics: {
		views: stat,
		downloads: stat,
		developerSales: stat,
		totalSales: stat,
		ownerships: stat,
		reviews: stat,
	},
	status: {
		value: 'inDevelopment',
		lastUpdated: 1.1,
		modifiedBy: '',
		reason: '',
	},
	submittedDate: new Date(),
	version: 0,
	rating: 375,
};


export default {
	title: 'Short app info',
	component: OcAppShortInfo,
} as Meta;

const Component: Story<OcAppShortInfoProps> = (args) => <OcAppShortInfo {...args} />;

export const Info = Component.bind({});
Info.args = {
	app: appData,
	clickByApp: action('clickByApp')
};
Info.storyName = 'Short app info';
