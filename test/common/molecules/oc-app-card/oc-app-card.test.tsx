import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { app1, app2 } from '../../../../stories/common/molecules/oc-app-card/mocks';
import { OcAppCard } from '../../../../src/ui/common/molecules';

describe('OcAppCard', () => {
	const component = shallow(
		<OcAppCard
			appRedirectLink="/"
			appIcon="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
			app={app1}
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show icon', () => {
		const component = mount(
			<OcAppCard
				appRedirectLink="/"
				appIcon="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
				app={app1}
			/>,
		);
		expect(component.find('img')).toBeTruthy();
	});

	it('should change props', () => {
		const component = mount(
			<OcAppCard
				appRedirectLink="/"
				appIcon="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
				app={app1}
			/>,
		);
		component.setProps({ app: app2 });
		component.setProps({ appRedirectLink: '/home' });
		component.setProps({
			appIcon:
				'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-2.png',
		});

		expect(component.prop('app')).toEqual(app2);
		expect(component.prop('appIcon')).toEqual(
			'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-2.png',
		);
		expect(component.prop('appRedirectLink')).toEqual('/home');
	});
});
