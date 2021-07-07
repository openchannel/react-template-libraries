import * as React from 'react';
import { mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

import { OcAppGallery, OcAppGalleryProps } from '../../../src/react-common-components/ui/market';

// @ts-ignore
import { getMockedApp } from './mocks';

const setUp = (props: OcAppGalleryProps) => mount(
	<BrowserRouter>
		<OcAppGallery {...props} />
	</BrowserRouter>
);

describe('OcAppGallery', () => {
	it('should render with empty app array and message', () => {
		const wrapper = setUp({
			// @ts-ignore
			appsArr: undefined,
			noAppMessage: 'There are no any apps here.',
		});
		expect(wrapper.find('.gallery__no-content')).toBeTruthy();
		expect(wrapper.find('.gallery__no-content').text()).toBe('There are no any apps here.');
	});

	it('should render with apps and', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp(), getMockedApp(), getMockedApp()],
		});

		expect(wrapper.find('.gallery__content').children()).toHaveLength(3);
	});

	it('should render with "default" props (title, description...)', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			appGalleryTitle: 'Test Apps',
			appGalleryDescription: 'The list of test apps',
		});

		expect(wrapper.find('.gallery__heading').text()).toContain('Test Apps');
		expect(wrapper.find('.gallery__description').text()).toContain('The list of test apps');
	});

	it('should not render link to "watch more apps"', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			appGalleryTitle: 'Test Apps',
			appGalleryDescription: 'The list of test apps',
			moreAppsTitle: 'See more',
		});
		expect(wrapper.find('.gallery__header-top').find(Link)).toHaveLength(0);
	});

	it('should render link to "watch more apps"', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			appGalleryTitle: 'Test Apps',
			appGalleryDescription: 'The list of test apps',
			moreAppsTitle: 'See more',
			seeAllUrl: '/some-collection',
		});

		const headerLink = wrapper.find('.gallery__header-top').find(Link);
		expect(headerLink.find('.gallery__more-text').text()).toContain('See more');
		// should render default icon.
		expect(headerLink.find('.gallery__more-icon')).toBeTruthy();
	});

	it('should render link to "watch more apps" with custom icon', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			appGalleryTitle: 'Test Apps',
			appGalleryDescription: 'The list of test apps',
			moreAppsTitle: 'See more',
			seeAllUrl: '/some-collection',
			routerIcon: '/path/to/icon',
		});

		const headerLink = wrapper.find('.gallery__header-top').find(Link);
		expect(headerLink.find('img').props().src).toBe('/path/to/icon');
	});

	it('card should be clickable', () => {
		const onAppClickMock = jest.fn();

		const wrapper = setUp({
			appsArr: [getMockedApp()],
			appGalleryTitle: 'Test Apps',
			appGalleryDescription: 'The list of test apps',
			onAppClick: onAppClickMock,
		});

		wrapper.find('.gallery__content-card').simulate('click');
		expect(onAppClickMock).toHaveBeenCalledTimes(1);
	});

	it('should render app card without link', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
		});

		const appLink = wrapper.find('.gallery__content-card').find(Link);
		expect(appLink).toHaveLength(0);
	});

	it('routerLinkForOneApp was passed without the "/" at the end of the link', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp(true)],
			appNavigationParam: 'appId',
			routerLinkForOneApp: '/link-without-slash-in-end',
		});

		const appLink = wrapper.find('.gallery__content-card').find(Link);
		expect(appLink.props().to).toBe('/link-without-slash-in-end/static-unique-id');
	});

	it('pass a correct link to the app', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp(true)],
			appNavigationParam: 'appId',
			routerLinkForOneApp: '/link-without-slash-in-end/',
		});

		const appLink = wrapper.find('.gallery__content-card').find(Link);
		expect(appLink.props().to).toBe('/link-without-slash-in-end/static-unique-id');
	});

	it('card app should render with custom template/children', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			customAppCardTemplate: <div className="some-custom-template" />,
		});

		expect(wrapper.find('.gallery__content-card').find('.oc-card')).toHaveLength(0);
		expect(wrapper.find('.gallery__content-card').find('.some-custom-template')).toHaveLength(1);
	});

	it('card app should render with custom template/children and wrapped with link', () => {
		const wrapper = setUp({
			appsArr: [getMockedApp()],
			routerLinkForOneApp: '/link-without-slash-in-end/123',
			appNavigationParam: '',
			customAppCardTemplate: <div className="some-custom-template" />,
		});

		expect(wrapper.find('.gallery__content-card').find(Link).find('.some-custom-template')).toHaveLength(1);
		expect(wrapper.find('.gallery__content-card').find(Link).props().to).toBe('/link-without-slash-in-end/123/');
	});
});
