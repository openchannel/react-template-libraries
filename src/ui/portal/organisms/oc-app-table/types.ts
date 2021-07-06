import { ReactElement } from 'react';

import { FullAppData } from '../../../common/models';
import { AppListing, AppListMenuAction, AppListOptions } from '../../models';

export interface SortIconProps {
	isAscending: boolean;
	/**
	 * Path to the custom icon for the `sort` button when ascending sorting chosen.
	 */
	ascendingSortIcon?: string | ReactElement;
	/**
	 * Path to the custom icon for the `sort` button when descending sorting chosen.
	 */
	descendingSortIcon?: string | ReactElement;
}

export interface DataRowProps {
	app: FullAppData;
	index?: number;
	isChild?: boolean;
	defaultAppIcon?: string;
	previewTemplate?: string;
	menuUrl?: string;
	menuOptions: AppListOptions[];
	onMenuClick?: (v: AppListMenuAction) => void;
}

export interface OcAppTableProps {
	/**
	 * Configuration of the component.
	 * By this configuration view and content of the component will be built.
	 */
	properties: AppListing;
	/**
	 * Message that will be shown if no apps in the data array..
	 */
	noAppMessage?: string;
	/**
	 * Set default app icon that will be
	 * shown when icon of the app is not present
	 */
	defaultAppIcon?: string;
	/**
	 * Path to the custom icon for the hidden menu toggle button.
	 */
	menuUrl?: string;
	/**
	 * Output of menu list item clicked action.
	 * Contains an action name, app ID, app version
	 */
	onMenuClick?: (v: AppListMenuAction) => void;
	/**
	 * Path to the custom icon for the `sort` button when ascending sorting chosen.
	 */
	ascendingSortIcon?: string | ReactElement;
	/**
	 * Path to the custom icon for the `sort` button when descending sorting chosen.
	 */
	descendingSortIcon?: string | ReactElement;
	/**
	 * Returns clicked sorting type.
	 * Contains fields:
	 *
	 * `by` - chosen sorting type, can be `name`, `created` or `status`;
	 *
	 * `ascending` - `true` for ascending sort or `false` for descending sort.
	 */
	onSort: (v: string) => void;
}
