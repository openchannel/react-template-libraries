//@ts-nocheck
import * as React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { OcFeaturedAppsComponent } from '../../../src/ui/common/organisms/oc-featured-apps';

const statElement = {
	'90day': 20,
	'30day': 10,
	total: 20,
};

const featuredApp = {
	appId: '34343-jjo-sgs-353-fgi-3423',
	icon: './assets/angular-common-components/get-started.svg',
	logo: './assets/angular-common-components/get-started.svg',
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

describe('OcFeaturedApps', () => {
	let component: ShallowWrapper = mount(<OcFeaturedAppsComponent />);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have props and change them', () => {
		expect(component.prop('data')).toEqual(data);
		expect(component.prop('categoryHeaderTitle')).toEqual('Categories to Explore');
		component.setProps({ categoryHeaderTitle: 'Default' });
		component.update();
		expect(component.prop('categoryHeaderTitle')).toEqual('Default');
	});
});
