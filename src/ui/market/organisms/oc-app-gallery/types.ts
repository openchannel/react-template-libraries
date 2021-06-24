import * as React from 'react';

import { FullAppData } from '../../../common/models';

export interface OcAppGalleryProps {
	appsArr: FullAppData[];
	/**
	 * Message that will be shown when no apps.
	 */
	noAppMessage?: string;
	/**
	 * Title for the app list preview.
	 */
	appGalleryTitle?: string;
	/**
	 * Description for the app list preview.
	 */
	appGalleryDescription?: string;
	/**
	 * More apps.
	 */
	moreAppsTitle?: string;
	/**
	 * Router link for the more apps navigation.
	 */
	seeAllUrl?: string;
	/**
	 * Path to the custom icon near 'See All'.
	 */
	routerIcon?: string;
	/**
	 * Router link for one app click.
	 */
	routerLinkForOneApp?: string;
	/**
	 * Key name of the App object which will be chosen like navigation parameter for the Router link.
	 */
	appNavigationParam?: string;
	/**
	 * Emitter for click by App card.
	 */
	onAppClick?: (app: FullAppData) => void;
	/**
	 * Custom template for the app card.
	 */
	customAppCardTemplate?: React.ReactElement;
}

export interface CardWrapperProps {
	app: FullAppData;
	customAppCardTemplate?: OcAppGalleryProps['customAppCardTemplate'];
	routerLinkForOneApp?: OcAppGalleryProps['routerLinkForOneApp'];
	appNavigationParam?: OcAppGalleryProps['appNavigationParam'];
	onAppClick?: OcAppGalleryProps['onAppClick'];
}
