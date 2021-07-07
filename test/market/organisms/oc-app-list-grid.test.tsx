import * as React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter, Link } from 'react-router-dom';

import { OcAppListGrid, OcAppListGridProps } from '../../../src/react-common-components/ui/market';
import { AppCardWrapper } from '../../../src/react-common-components/ui/market/organisms/oc-app-list-grid/components/app-card-wrapper';

// @ts-ignore
import { getMockedApp } from './mocks';

const setUp = (props: OcAppListGridProps) => mount(
	<BrowserRouter>
		<OcAppListGrid {...props} />
	</BrowserRouter>
);

describe('OcAppListGrid', () => {
	it('should render with empty app array and message', () => {
		const wrapper = setUp({
			// @ts-ignore
			appList: undefined,
			noAppMessage: 'There are no any apps here.',
		});
		expect(wrapper.find('.app-list_empty')).toBeTruthy();
		expect(wrapper.find('.app-list_empty').text()).toBe('There are no any apps here.');
	});

	it('should render with 1 card app', () => {
		const wrapper = setUp({
			appList: [ getMockedApp() ],
		});
		expect(wrapper.find('.app-list').children()).toHaveLength(1);
		expect(wrapper.find('.app-list').find(AppCardWrapper)).toBeTruthy();
	});

	it('should render app card with valid router link', () => {
		const wrapper = setUp({
			appList: [ getMockedApp(true) ],
			appNavigationParam: 'appId',
			baseLinkForOneApp: '/link-for-app',
		});
		expect(wrapper.find(Link).props().to).toBe('/link-for-app/static-unique-id');
	});

	it('app card should be clickable', () => {
		const onAppClickMock = jest.fn();
		const wrapper = setUp({
			appList: [ getMockedApp() ],
			onAppClick: onAppClickMock,
		});

		wrapper.find('.app-list__card-container').simulate('click');
		expect(onAppClickMock).toHaveBeenCalledTimes(1);
	});

	it('should', () => {
		const wrapper = setUp({
			appList: [ getMockedApp() ],
			customAppCardTemplate: <div className="custom-template" />,
		});
		expect(wrapper.find('.custom-template')).toBeTruthy();
	});
});
