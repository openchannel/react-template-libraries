import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { UserAccountTypeModel } from '../model/api/user-type.model';

const DEV_ACCOUNT_TYPES_URL = 'v2/developerAccountTypes';

export const developerAccountTypes = {
	/**
	 *
	 * Description: Get Developer account type data
	 *
	 * @param {string} type
	 * @param {any} httpOptions
	 *
	 * ### Example
	 *
	 * `getAccountType('type', {headers: {Authorization: 'Bearer a8yshd89a7hsd87ha98d7s'}}});`
	 */
	getAccountType(type: string, httpOptions?: any) {
		return api.get<any, UserAccountTypeModel>(`${DEV_ACCOUNT_TYPES_URL}/${type}`, httpOptions);
	},

	/**
	 *
	 * Description: Get Developer account types list with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count Developer Account Types into response. Starts from >= 1.
	 * @param {string} filter - (optional) Your specific search filter.
	 *
	 * ### Example
	 *
	 * `getAllDeveloperAccountsType(1, 10, "{"name": {"$in":["first", "second"]}}");`
	 */
	getUserAccountTypes(pageNumber?: number, limit?: number, query?: string) {
		return api.get<any, Page<UserAccountTypeModel>>(DEV_ACCOUNT_TYPES_URL, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				query: query,
			},
		});
	},
};
