import { Page } from '../../dist';
import { api } from '../lib/api';
import { UserAccount } from '../model/api/user.model';

/**
 *
 * Description: API service for getting and modifying User Account model.<br>
 *
 * Documentation: <a href="https://support.openchannel.io/documentation/api/#481-user">Openchannel API</a><br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/userAccounts/all'<br>
 *
 * GET 'v2/userAccounts/this'<br>
 *
 * PATCH 'v2/userAccounts/this'<br>
 *
 * DELETE 'v2/userAccounts/this'<br>
 *
 * GET 'v2/userAccounts/{userAccountId}'<br>
 *
 * DELETE 'v2/userAccounts/{userAccountId}'<br>
 *
 */

const USER_URL = 'v2/userAccounts';

export const userAccount = {
	/**
	 * Description: Getting data about none-developer users
	 *
	 * @returns {UserAccount} Promise<AxiosResponse<UserAccount>>
	 *
	 *
	 * ### Example
	 *``
	 * getUserAccount()
	 *``
	 */
	getUserAccount() {
		return api.get<any, UserAccount>(`${USER_URL}/this`);
	},

	/**
	 *
	 * Description: Get list of User Accounts with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count apps into response. Starts from >= 1.
	 * @param {string} sort - (optional) Sort apps by specific field.
	 * @param {string} query - (optional) Your specific search query.
	 * @returns {<Page<UserAccount>>}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * getUserAccounts(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
	 *``
	 */
	getUserAccounts(pageNumber?: number, limit?: number, sort?: string, query?: string) {
		return api.get<Page<UserAccount>>(`${USER_URL}/all`, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				query: query,
				sort: sort,
			},
		});
	},

	/**
	 * Description: Update User Account fields for some particular user
	 *
	 * @param {string} userAccountId - (required)
	 * @param {boolean} skipTypeValidation - (optional)
	 * @param {any} body
	 * @returns {<UserAccount>}  Promise<AxiosResponse<UserAccount>>
	 *
	 * ### Example
	 *``
	 * updateUserAccountFieldsForAnotherUser('8ahs9d87has8d7h', true, {name: 'Test'});
	 *``
	 */
	updateUserAccountFieldsForAnotherUser(
		userAccountId: string,
		skipTypeValidation: boolean,
		body: any,
	) {
		return api.patch<any, UserAccount>(`${USER_URL}/${userAccountId}`, {
			params: {
				skipTypeValidation: String(skipTypeValidation),
				body: body,
			},
		});
	},

	/**
	 * Description: Updating user account fields
	 *
	 * @param {any} accountData - data from user profile form
	 * @returns {accountData: any}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * updateUserAccount({name: 'Test'});
	 *``
	 */
	updateUserAccount(accountData: any) {
		return api.patch<any>(`${USER_URL}/this`, accountData);
	},

	/**
	 * Description: Deleting User Account by Id
	 *
	 * @param {string} userAccountId - (required) Account Id to delete
	 * @returns {<any>}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * deleteUserAccount('a8s6gd978asgd8');
	 *``
	 */
	deleteUserAccount(userAccountId: string) {
		return api.delete<any>(`${USER_URL}/${userAccountId}`);
	},
	/**
	 * Description: Deleting User Accaunt of none-developer
	 *
	 * @returns {<any>}  Promise<AxiosResponse<any>>
	 *
	 * ### Example
	 *``
	 * deleteCurrentUserAccount();
	 *``
	 */ deleteCurrentUserAccount() {
		return api.delete<any>(`${USER_URL}/this`);
	},
};
