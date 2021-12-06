import { api } from '../lib/api';

/**
 * Description: API service for getting Developer Roles.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerRoles'<br>
 */

const USER_ACCOUNT_TYPES_URL = 'v2/userAccountTypes';

export const developerRoleService = {
	/**
	 *
	 * Description: Get Developer Roles list with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
	 * @param {number} pageLimit - (optional) Count user types into response. Starts from >= 1
	 * @returns {Page<DeveloperRoleResponse | any>}
	 *
	 * ### Example
	 *
	 * `getDeveloperRoles(1, 10)`
	 */
	getDeveloperRoles(pageNumber?: number, pageLimit?: number) {
		return api.get(USER_ACCOUNT_TYPES_URL, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(pageLimit),
			},
		});
	},
};
