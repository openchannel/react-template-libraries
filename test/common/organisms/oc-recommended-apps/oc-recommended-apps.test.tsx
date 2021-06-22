//@ts-nocheck
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ShallowWrapper } from 'enzyme';
import { OcRecommendedAppsComponent } from '../../../../src/ui/common/index';

const statElement = {
	'90day': 10,
	'30day': 20,
	total: 30,
};

const app = {
	appId: '344gf-s3j-gi3423',
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
	description: 'Some Description',
	lastUpdated: new Date(),
	version: 1.1,
	safeName: ['test-app'],
	developerId: '44555-3232gvdfdf',
	submittedDate: new Date(),
	created: new Date().getMonth() - 2,
	status: {
		value: '',
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

const app1 = { ...app };
app1.description = 'With this plugin you can communicate with your teammates any time';
app1.summary = 'With this plugin you can communicate with your teammates any time';
app1.icon = './img/standard-app-icon.svg';
app1.name = 'Plugin';
app1.model[0].type = 'free';
app1.rating = 3.5;
app1.reviewCount = 12;

const app2 = { ...app };
app2.description = app2.summary =
	'Integrate directly with your account and make customer updates a breeze';
app2.icon = './img/standard-app-icon.svg';
app2.name = 'Application';
app2.model[0].price = 11.99;
app2.rating = 0;
app2.reviewCount = 0;

const app3 = { ...app };
app3.description = app2.summary = 'Improve and extend your experience right from your own UI';
app3.icon = './img/standard-app-icon.svg';
app3.name = 'Integration';
app3.model[0].price = 4.99;
app3.rating = 4.9;
app3.reviewCount = 87;

describe('OcAppCategoriesComponent', () => {
	let component: ShallowWrapper = mount(
		<BrowserRouter>
			<OcRecommendedAppsComponent
				appList={[app1, app2, app3]}
				noAppMessage="No App Found"
				recommendedAppTitle="Recommended For You"
			/>
		</BrowserRouter>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have props', () => {
		component.setProps({ appList: [app1, app2, app3] });
		component.setProps({ noAppMessage: 'No App Found' });
		component.setProps({ recommendedAppTitle: 'Recommended For You' });
		expect(component.prop('appList')).toEqual([app1, app2, app3]);
		expect(component.prop('noAppMessage')).toEqual('No App Found');
		expect(component.prop('recommendedAppTitle')).toEqual('Recommended For You');
	});
});
