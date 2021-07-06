import { FullAppData } from '../../common/models';

/** The available options of the dropdown menu */
export type AppListOptions =
	| string
	| 'EDIT'
	| 'PREVIEW'
	| 'PUBLISH'
	| 'SUBMIT'
	| 'SUSPEND'
	| 'UNSUSPEND'
	| 'DELETE';

/** Configuration model for the App Listing component */
export interface AppListing {
	/** layout of the component. Default: 'table' */
	layout: string | 'table';
	/** data response with list of apps, pagination, etc. */
	// data: ComponentsPage<FullAppData>;
	data: {
		list: FullAppData[];
	};
	/** array of options which will be applied in dropdown menu of the component */
	options: AppListOptions[];
	/**
	 * A URL template for the preview.
	 * @example https://mysite.com/apps/{appId}/{version}
	 */
	previewTemplate?: string;
}

/** Interface for the action from a dropdown menu */
export interface AppListMenuAction {
	/** Which action was chosen */
	action: AppListOptions;
	/** ID of the app which has been chosen */
	appId: string;
	/** Version of the app which has been chosen */
	appVersion: number;
	/** Marker for apps which has been subversion of the main app */
	isChild?: boolean;
}
