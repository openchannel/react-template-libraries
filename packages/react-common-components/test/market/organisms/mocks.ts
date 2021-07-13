import { nanoid } from 'nanoid';
import { FullAppData } from '@openchannel/react-common-components';

const statElement = {
	'90day': 20,
	'30day': 10,
	total: 20,
};

export const getMockedApp = (isStatic?: boolean): FullAppData => ({
	appId: isStatic? 'static-unique-id' : nanoid(),
	icon: '',
	name: 'Test App',
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
});
