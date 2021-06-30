import * as React from 'react';

import { FullAppData } from '../../../common/models';

export interface AppCardWrapperProps {
	app: FullAppData;
	baseLinkForOneApp?: string;
	customAppCardTemplate?: React.ReactElement;
	onAppClick?: (app: FullAppData) => void;
	appNavigationParam?: string;
}

export interface OcAppListGridProps {
	/**
	 * The array of the apps what will be shown in this component.
	 * @default []
	 */
	appList: FullAppData[];
	/**
	 * Message that will be shown when appList array is empty.
	 * This input required if you want to show the message for case with no apps in component.
	 */
	noAppMessage?: string;
	/**
	 * Path to the custom Default App Icon that will be shown when the app has no icon.
	 */
	defaultAppIcon?: string;
	/**
	 * Custom template for the app card. If not set, default app card will be shown.
	 */
	customAppCardTemplate?: React.ReactElement;
	/**
	 * Base routerLink for one app. Path to the page to which will be redirected, by click on the app card.
	 */
	baseLinkForOneApp?: string;
	/**
	 * Key name of the App object which will be chosen like navigation parameter for the Router link.
	 * If not set, no special parameter would be applied for routerLink.
	 */
	appNavigationParam?: string;
	/**
	 * The emitter reports that current app card has been clicked. Return current app object data.
	 */
	onAppClick?: (app: FullAppData) => void;
}
