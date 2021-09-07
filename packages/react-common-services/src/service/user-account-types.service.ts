import { api } from "../lib/api";
import { Page } from "../model/api/page.model";
import { UserAccountTypeModel } from "../model/api/user-type.model";


const USER_ACCOUNT_TYPES_URL = 'v2/userAccountTypes';

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
export const userAccountTypesService = {
	getUserAccountTypes(pageNumber?: string, limit?: number, query?: string) {
		return api.get<any, Page<UserAccountTypeModel>>(USER_ACCOUNT_TYPES_URL,
			{params:
					{
						pageNumber: pageNumber,
						limit: limit,
						query: query
					}
			},
		)
	}
}
