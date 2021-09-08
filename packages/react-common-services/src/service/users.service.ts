import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';
import { Page } from '../model/api/page.model';
import { TypeFieldModel, TypeModel } from '../model/api/type.model';

const USER_TYPES_URL = 'v2/userTypes';

/**
 *
 * Description: Get all user types with pagination
 *
 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
 * @param {number} pageLimit - (optional) Count user types into response. Starts from >= 1.
 * @param {string} sort - (optional) Sort user types by specific field.
 * @param {string} query - (optional) Your specific search query.
 * @param {ReqHeaders} headers - (optional)
 * @returns Promise<AxiosResponse<TypeModel<TypeFieldModel>>>
 *
 * ### Example
 *``
 * getUserTypes(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}", {"Authorization": "Bearer aksjhdl123dlkjahslk123jhaslakjhalksj"})
 *``
 */
export const UsersService = {
	getUsersTypes(
		query?: string,
		sort?: string,
		pageNumber?: number,
		pageLimit?: number,
		headers?: ReqHeaders,
	) {
		return api.get<any, Page<TypeModel<TypeFieldModel>>>(USER_TYPES_URL, {
			params: {
				query: query,
				sort: sort,
				pageNumber: pageNumber,
				pageLimit: pageLimit,
				headers: headers,
			},
		});
	},
};
