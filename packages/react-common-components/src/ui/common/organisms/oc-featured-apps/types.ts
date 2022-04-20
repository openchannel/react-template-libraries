import * as React from 'react';

import { FullAppData } from '../../models';

export interface OcFeaturedAppsProps {
	/**
	 * List of Featured apps. Must contain the fields: "icon", "name", "summary", "appId".
	 * @type FullAppData[]
	 * @default []
	 */
	data: FullAppData[];

	/**
	 * A title of the featured apps.
	 * @type string
	 * @default Featured
	 */
	label?: string;

	/**
	 * The message that will be shown when there are no featured apps.
	 * @type string
	 * @default No Featured App
	 */
	emptyDataMessage?: string;

	/**
	 * List of classes that will be added to the default class list.
	 * @type string
	 * @default ''
	 */
	customClass?: string;

	/**
	 * Router link for each app card.
	 * Will end with chosen navigation parameter.
	 * Using for the default app card. If you are using the custom card - you must create your own router link on the card template.
	 * @type string
	 * @default ''
	 * @example.
	 * '/details/ap-application-regression-14may'.
	 */
	mainRouterLink?: string;

	/**
	 * Custom template for the featured app card.
	 * @type FullAppData
	 */
	customFeaturedAppCardTemplate?: string | React.ReactNode;

	/**
	 * Key name of the App object which will be chosen like navigation parameter for the Router link.
	 * Using only with the default app card template.
	 * @type string
	 * @example
	 * 'appId'.
	 */
	navigationParam?: string;
}
