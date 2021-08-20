import { api } from '../lib/api';
import type { Page } from '../model/api/page.model';
import type {
	AppResponse,
	AppStatusValue,
	CreateAppModel,
	PublishAppVersionModel,
} from '../model/api/app-data.model';

const APPS_URL = 'v2/apps';

export const apps = {
	/**
	 * Description: Searching apps returns App Pages based on query and text criteria.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#438-apps-search-apps">Openchannel API</a>
	 *
	 * @param searchText (required) Text for searching
	 * @param query - (optional) Your specific search query.
	 *  Documentation <a href="https://support.openchannel.io/documentation/api/#380-query-document">Openchannel API</a>
	 * @param fields (required) Fields for searching.
	 *  Default value = ['name'].
	 *
	 *  @return Promise<AxiosResponse<Page<AppResponse>>>
	 *
	 * ### Example:
	 *``
	 * searchApp("My First App", "{"status.value": {"$in":["pending", "inDevelopment"]}}")
	 *``
	 */
	searchApp: (
		searchText: string,
		query?: string,
		fields: string[] = ['name'],
	) => {
		const params = {
			fields: String(fields),
			text: searchText || '',
			query,
		};

		return api.get<any, Page<AppResponse>>(`${APPS_URL}/textSearch`, { params });
	},

	/**
	 * Description: Listing apps returns App Pages based on query and sort criteria.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#436-apps-list-apps">Openchannel API</a>
	 *
	 * @param pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param limit - (optional) Count apps into response. Starts from >= 1.
	 * @param sort - (optional) Sort apps by specific field.
	 *  Documentation <a href="https://support.openchannel.io/documentation/api/#381-sort-document">Openchannel API</a>
	 * @param query - (optional) Your specific search query.
	 *  Documentation <a href="https://support.openchannel.io/documentation/api/#380-query-document">Openchannel API</a>
	 * @param isOwner (optional) Whether this result should only contain apps that are owned by this user.
	 *   Default value = false.
	 *
	 * @return Promise<AxiosResponse<Page<AppResponse>>>
	 *
	 * ### Example:
	 * ``
	 * getApps(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}", true);
	 * ``
	 */
	getApps: (
		pageNumber?: number,
		limit?: number,
		sort?: any,
		query?: any,
		isOwner: boolean = false,
	) => api.get<any, Page<AppResponse>>(
		APPS_URL,
		{ params: { sort, query, isOwner, pageNumber, limit } },
	),

	/**
	 * Description: Retrieving an app returns a single, specific, live app by safe name.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#761-apps-get-app-by-safename">Openchannel API</a>
	 *
	 * @param appSafeName (required) The safeName of the app
	 *
	 * @return Promise<AxiosResponse<AppResponse>>
	 *
	 * ### Example:
	 * ``
	 * getAppBySafeName("fuel-crm-and-marketing");
	 * ``
	 */
	getAppBySafeName: (appSafeName: string) => api.get<any, AppResponse>(`${APPS_URL}/bySafeName/${appSafeName}`),

	/**
	 * Description: Create an app with version 1.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#407-apps-create-app">Openchannel API</a>
	 *
	 * @param body (required) Request data for creating a new app.
	 *  Note: fields 'name' and 'developerId' are required in this request.
	 *
	 *  @return Promise<AxiosResponse<AppResponse>>
	 *
	 * ### Example:
	 * ``
	 * createApp({"name": "My App", "developerId":"a76dj3gks"});
	 * ``
	 */
	createApp: (body: CreateAppModel) => api.post<CreateAppModel, AppResponse>(APPS_URL, { body }),

	/**
	 * Description: Delete the app by app ID.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#409-apps-delete-app">Openchannel API</a>
	 *
	 * @param id (required) Application ID.
	 *
	 * @return empty response {};
	 *
	 * ### Example:
	 * ``
	 *  deleteApp("6238426d0c0osf654208");
	 * ``
	 */
	deleteApp: (id: string) => api.delete<any, any>(`${APPS_URL}/${id}`),

	/**
	 * Description: When a developer creates or updates an app, a new app version is created but
	 *  is not yet visible to users or administrators. Publishing apps makes the app visible to the administrator
	 *  and signals the app’s readiness for entry to the public marketplace. This is useful when developers have created
	 *  an app draft and are ready to submit their app for approval.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#412-apps-publish-app-version">Openchannel API</a>
	 *
	 * @param id (required) Application ID.
	 * @param body
	 *
	 * @return empty response {};
	 *
	 * ### Example:
	 * ``
	 * publishAppByVersion("6238426d0c0osf654208", {"version": 1, "autoApprove": true})
	 * ``
	 */
	publishAppByVersion: (id: string, body: PublishAppVersionModel) =>
		api.post<PublishAppVersionModel>(`${APPS_URL}/${id}/publish`, { body }),

	/**
	 * Description: Returns a single, specific, live app.
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#437-apps-get-an-app">Openchannel API</a>
	 *
	 * @param id (required) Application ID.
	 *
	 * @return Promise<AxiosResponse<AppResponse>>
	 *
	 * ### Example:
	 * ``
	 * getAppById("6238426d0c0osf654208");
	 * ``
	 */
	getAppById: (id: string) => api.get<any, AppResponse>(`${APPS_URL}/${id}`),

	/**
	 * Description: Changes the status of an app. This action can be performed by either administrators or developers.
	 * Only certain status changes are allowed. For instance, a developer is only able to suspend and unsuspend their app
	 * (which must already be approved).
	 *
	 * Documentation: <a href="https://support.openchannel.io/documentation/api/#415-apps-status-change">Openchannel API</a>
	 *
	 * @param id (required) Application ID.
	 * @param version (required) Application version. Starts from >= 1.
	 * @param status (required) 'pending' | 'inReview' | 'inDevelopment' | 'approved' | 'suspended' | 'rejected'.
	 * @param reason (optional) The reason for this status change.
	 *
	 * @return empty response {};
	 *
	 * ### Example:
	 * ``
	 * changeAppStatus("6238426d0c0osf654208", 1, 'pending', 'Approved by admin.')
	 * ``
	 */
	changeAppStatus: (
		id: string,
		version: number,
		status: AppStatusValue,
		reason: string = '',
	) => api.post(`${APPS_URL}/${id}/versions/${version}/status`, { body: { status, reason } }),
};
