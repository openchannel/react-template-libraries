import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { OcGetStartedComponent } from '@openchannel/react-common-components';

describe('OcAppGetStartedComponent', () => {
	const component = shallow(
		<OcGetStartedComponent
			getStartedType="home"
			getStartedHeader="List Your App in our App Store"
			getStartedDescription="Register as an app developer and submit your app easily with our App Store Developer Portal"
			getStartedButtonText="Get Started As An App Developer"
			getStartedImage="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show search', () => {
		const component = mount(
			<OcGetStartedComponent
				getStartedType="home"
				getStartedHeader="List Your App in our App Store"
				getStartedDescription="Register as an app developer and submit your app easily with our App Store Developer Portal"
				getStartedButtonText="Get Started As An App Developer"
				getStartedImage="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
			/>,
		);
		expect(component.prop('getStartedHeader')).toEqual('List Your App in our App Store');
	});

	it('should show home', () => {
		const component = mount(
			<OcGetStartedComponent
				getStartedType="home"
				getStartedHeader="List Your App in our App Store"
				getStartedDescription="Register as an app developer and submit your app easily with our App Store Developer Portal"
				getStartedButtonText="Get Started As An App Developer"
				getStartedImage="https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png"
			/>,
		);
		component.setProps({ getStartedType: 'home' });
		component.setProps({ getStartedDescription: 'This is only test description' });
		component.setProps({
			getStartedImage:
				'https://stage1-philips-market-test.openchannel.io/assets/angular-common-components/item-1.png',
		});

		expect(component.prop('getStartedDescription')).toEqual('This is only test description');
		expect(component.prop('getStartedImage')).toBeTruthy();
	});
});
