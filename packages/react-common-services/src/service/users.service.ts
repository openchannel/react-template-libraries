import { toString } from 'lodash';

import { UserCompanyModel } from '../../dist';
import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';
import { Page } from '../model/api/page.model';
import { TypeFieldModel, TypeModel } from '../model/api/type.model';

/**
 * Description: API service for getting and modifying user model.<br>
 *
 * Documentation: <a href="https://support.openchannel.io/documentation/api/#439-users">Openchannel API</a><br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/users/all'<br>
 *
 * GET 'v2/users/this'<br>
 *
 * PATCH 'v2/users/this'<br>
 *
 * GET 'v2/userTypes/{type}'<br>
 *
 * GET 'v2/userTypes'<br>
 *
 */

const USER_TYPES_URL = 'v2/userTypes';
const USER_URL = 'v2/users';

export const users = {
	/**
	 *
	 * Description: Getting data about non-developer user's company
	 *
	 * @returns {<UserCompanyModel>}  Promise<AxiosResponse<UserCompanyModel>>
	 *
	 * ### Example
	 *``
	 * getUserCompany()
	 *``
	 */
	getUserCompany() {
		return api.get<any, UserCompanyModel>(`${USER_URL}/this`);
	},

	/**
	 *
	 * Description: Saving data of non-developer user's company
	 *
	 * @param {any} companyData (required) new company fields data
	 * @returns {<any>}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * updateUserCompany(any)
	 *``
	 */
	updateUserCompany(companyData: any) {
		return api.patch<any>(`${USER_URL}/this`, companyData);
	},

	/**
	 *
	 * Description: Getting Fields definition for current user type
	 *
	 * @param {string} type (required) User Type
	 * @param {any} httpOptions (optional)
	 * @returns {<any>} Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * getUserTypeDefinition('developer', {"Authorization": "Bearer aksjhdl123dlkjahslk123jhaslakjhalksj"})
	 *``
	 */
	getUserTypeDefinition(type: string, httpOptions?: any) {
		return api.get<any>(`${USER_TYPES_URL}/${type}`, httpOptions);
	},

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
	getUserTypes(
		query?: string,
		sort?: string,
		pageNumber?: number,
		pageLimit?: number,
		headers?: ReqHeaders,
	) {
		return api.get<any, Page<TypeModel<TypeFieldModel>>>(USER_TYPES_URL, {
			headers,
			params: {
				query: query,
				sort: sort,
				pageNumber: toString(pageNumber),
				pageLimit: toString(pageLimit),
			},
		});
	},
};
