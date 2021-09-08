import { api } from '../lib/api';
import { UserAccount } from '../model/api/user.model';

const USER_URL = 'v2/users';

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
		return api.patch(`${USER_URL}/this`, accountData);
	},
};
