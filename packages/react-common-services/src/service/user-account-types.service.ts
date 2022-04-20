import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { UserAccountTypeModel } from '../model/api/user-type.model';

const USER_ACCOUNT_TYPES_URL = 'v2/userAccountTypes';

export const userAccountTypes = {
	/**
	 *
	 * Description: Getting user profile fields definition by type
	 *
	 * @param {string} type - (required) type from the user account data
	 * @param {any} httpOptions - (optional)
	 * @returns {<UserAccountTypeModel>}  Promise<AxiosResponse<UserAccountTypeModel>>
	 *
	 * ### Example
	 *``
	 * getUserAccountType("developer", {"Authorization": "Bearer o8ahsd89has08dha08s7dh"})
	 *``
	 */
	getUserAccountType(type: string, httpOptions?: any) {
		return api.get<any, UserAccountTypeModel>(`${USER_ACCOUNT_TYPES_URL}/${type}`, httpOptions);
	},

	/**
	 *
	 * Description: Get account types list with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count types into response. Starts from >= 1.
	 * @param {string} query - (optional) Your specific search query.
	 * @returns Promise<AxiosResponse<Page<UserAccountTypeModel>>>
	 *
	 * ### Example
	 *``
	 * getUserAccountTypes(1,10,"{"name": {"$in":["first", "second"]}}")
	 *``
	 */
	getUserAccountTypes(pageNumber?: number, limit?: number, query?: string) {
		return api.get<any, Page<UserAccountTypeModel>>(USER_ACCOUNT_TYPES_URL, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				query: query,
			},
		});
	},
};
