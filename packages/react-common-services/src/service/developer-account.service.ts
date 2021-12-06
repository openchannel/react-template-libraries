import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { UserAccount } from '../model/api/user.model';

/**
 * Description: API service for getting and modifying User Account model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerAccounts/all'<br>
 *
 * GET 'v2/developerAccounts/this'<br>
 *
 * PATCH 'v2/developerAccounts/this'<br>
 *
 * DELETE 'v2/developerAccounts/this'<br>
 *
 * PATCH 'v2/developerAccounts/{developerAccountId}'<br>
 *
 * DELETE 'v2/developerAccounts/{developerAccountId}'<br>
 */

const DEV_URL = 'v2/developerAccounts';

export const developerAccount = {
	/**
	 *
	 * Description: Get developer account data
	 *
	 * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
	 *
	 * ### Example
	 *
	 * `getAccount();`
	 */
	getUserAccount() {
		return api.get<any, UserAccount>(`${DEV_URL}/this`);
	},

	/**
	 *
	 * Description: Get list of developer accounts with pagination
	 *
	 * @param {number} page - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count Developer Accounts into response. Starts from >= 1.
	 * @param {string} sort - (optional) Sort Developer Accounts by specific field.
	 * @param {string} filter - (optional) Your specific search filter.
	 * @returns {Observable<Page<DeveloperAccountModel>>} `Observable<Page<DeveloperAccountModel>>`
	 *
	 * ### Example
	 *
	 * `getDeveloperAccounts(1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}");`
	 */
	getDeveloperAccounts(pageNumber?: number, limit?: number, sort?: string, query?: string) {
		return api.get<any, Page<UserAccount>>(`${DEV_URL}/all`, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				query: query,
				sort: sort,
			},
		});
	},

	/**
	 *
	 * Description: Update developer account to specific user
	 *
	 * @param {string} devAccountId
	 * @param {string} skipTypeValidation
	 * @param {Partial<DeveloperAccount>} body
	 * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
	 *
	 * ### Example
	 *
	 * `updateAccountFieldsForAnotherUser('ga7s6dg7a6sgd876ags7d8', false, {name: 'Developer'});`
	 */
	updateAccountFieldsForAnotherUser(devAccountId: string, skipTypeValidation: boolean, body: any) {
		return api.patch<any, UserAccount>(`${DEV_URL}/${devAccountId}`, {
			params: {
				skipTypeValidation: String(skipTypeValidation),
			},
			body,
		});
	},

	/**
	 *
	 * Description: Update developer account fields
	 *
	 * @param {Partial<DeveloperAccount>} body - Data to update
	 * @returns {Observable<DeveloperAccount>} `Observable<DeveloperAccount>`
	 *
	 * ### Example
	 *
	 * `getAccount({name: 'Developer'});`
	 */
	updateAccountFields(accountData: any) {
		return api.patch<any>(`${DEV_URL}/this`, { body: accountData });
	},

	/**
	 * Description: Deleting User Account by Id
	 *
	 * @param {string} devAccountId - (required) Account Id to delete
	 * @returns {<any>}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * deleteUserAccount('a8s6gd978asgd8');
	 *``
	 */
	deleteDevAccount(devAccountId: string) {
		return api.delete<any>(`${DEV_URL}/${devAccountId}`);
	},
	/**
	 *
	 * Description: Delete current developer account
	 *
	 * @returns {Observable<any>} `Observable<any>`
	 *
	 * ### Example
	 *
	 * `deleteCurrentDeveloperAccount();`
	 */
	deleteCurrentDeveloperAccount() {
		return api.delete<any>(`${DEV_URL}/this`);
	},
};
