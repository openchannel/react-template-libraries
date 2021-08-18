import { api } from '../lib/api';
import type { ChangePasswordRequest } from '../model/api/change-password.model';
import type { SignUpByInviteRequest } from '../model/api/login.model';
import type { UserResetPassword } from '../model/api/user-activation.model';
import type {
	OCNativeCustomSignup,
	OCNativeDefaultSignup,
	UserLoginModel,
} from '../model/api/user-login.model';

const NATIVE_URL = 'auth/native';

/**
 * Description: API service for Native authorization.<br>
 * Endpoints:<br>
 * POST 'auth/native/token'<br>
 * POST 'auth/native/register'<br>
 * POST 'auth/native/invite'<br>
 * POST 'auth/native/activate'<br>
 * POST 'auth/native/send-reset-code'<br>
 * POST 'auth/native/reset-password'<br>
 * POST 'auth/native/send-activate-code'<br>
 * POST 'auth/native/change-password'<br>
 */
export const nativeLogin = {
	/**
	 * Description: Login to app
	 * @param {UserLoginModel} body - (required) User login data
	 * @returns {Promise<any>} `Promise<any>`
	 * * ### Example:
	 * `signIn({
	 *    email: 'admin@admin.com',
	 *    password: 'Password1!',
	 *    isChecked: true
	 * })`
	 */
	signIn(body: UserLoginModel) {
		return api.post(`${NATIVE_URL}/token`, { body });
	},

	/**
	 * Description: This service is responsible for user signup feature.
	 *
	 * @param {OCNativeDefaultSignup | OCNativeCustomSignup} userSignUp - (required) User Sign Up data
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 * `signup({
	 *      uname:'Name',
	 *      email:'email@email.com',
	 *      company:'company',
	 *      password:'password'
	 *  })`
	 *
	 * OR
	 *
	 * `signup({
	 *  account: {
	 *      name: 'Acc',
	 *      username: 'Name',
	 *      type: 'Type',
	 *      email: 'email@email.com',
	 *      customData: {},
	 * },
	 *  organization: {
	 *      name: 'Acc',
	 *      username: 'Name',
	 *      type: 'Type',
	 *      email: 'email@email.com',
	 *      customData: {},
	 * }
	 * })`
	 */
	signup: (userSignUp: OCNativeDefaultSignup | OCNativeCustomSignup) => {
		return api.post(`${NATIVE_URL}/register`, { body: { userSignUp } });
	},

	/**
	 * Description: Sign up a user by invite.
	 *
	 * @param {SignUpByInviteRequest} userSignUp - (required) Invited user Sign Up data and Token
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `signupByInvite({
	 *      inviteToken: 'a97hsd987ahsd87ha0s7d8h0',
	 *      userCustomData: {name: 'Name'}
	 * })`
	 */
	signupByInvite(userSignUp: SignUpByInviteRequest) {
		return api.post(`${NATIVE_URL}/invite`, { body: { userSignUp } });
	},

	/**
	 * Description: This method is responsible for submit user activation form.
	 *
	 * @param {any} activationModel - (required) Data from activation form
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `activate({
	 *  name: 'Name'
	 * })`
	 */
	activate(activationModel: any) {
		return api.post(`${NATIVE_URL}/activate`, activationModel);
	},

	/**
	 * Description: This method is responsible for reset user password.
	 *
	 * @param {string} email - (required) User Email to send reset Code
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `sendResetCode('email@email.com');`
	 */
	sendResetCode(email: string) {
		return api.post(`${NATIVE_URL}/send-reset-code`, { params: { email } });
	},

	/**
	 * Description: This method is responsible for reset user password.
	 *
	 * @param {UserResetPassword} body (required) Request params. New password and code.
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `resetPassword({
	 *     newPassword: 'password'
	 *     code: '123'
	 * })`
	 */
	resetPassword(body: UserResetPassword) {
		return api.post(`${NATIVE_URL}/reset-password`, { body });
	},

	/**
	 * Description: This method is responsible for resend activation mail
	 *
	 * @param {string} email - (required) User Email to send Activation Code
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `sendActivationCode('email@email.com');`
	 */
	sendActivationCode(email: string) {
		return api.post(`${NATIVE_URL}/send-activate-code`, { body: { email } });
	},

	/**
	 * Description: This method is responsible for change user password.
	 *
	 * @param {ChangePasswordRequest} body (required) Model with current and new passwords
	 * @returns {Promise<any>} `Promise<any>`
	 *
	 * * ### Example:
	 *
	 * `changePassword({
	 *      password: 'password',
	 *      newPassword: 'newPassword'
	 * });`
	 */
	changePassword(body: ChangePasswordRequest) {
		return api.post(`${NATIVE_URL}/change-password`, { body });
	},
};
