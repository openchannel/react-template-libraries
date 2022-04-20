import { api } from '../lib/api';
import { InviteDeveloperModel, InviteUserModel } from '../model/api/invite-user.model';
import { Page } from '../model/api/page.model';

/**
 * Description: API service to manage User Invites.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/invites/users'<br>
 *
 * GET 'v2/invites/users/byToken/{token}'<br>
 *
 * POST 'v2/invites/users/byId/{inviteId}'<br>
 *
 * DELETE 'v2/invites/users/byId/{inviteId}'<br>
 *
 * GET 'v2/invites/developers'<br>
 *
 * GET 'v2/invites/developers/byToken/{token}'<br>
 *
 * POST 'v2/invites/developers/byId/{inviteId}'<br>
 *
 * DELETE 'v2/invites/users/byId/{inviteId}'<br>
 *
 * POST 'v2/invites/{userType}'<br>
 */

const USER_INVITES_URL = 'v2/invites';

export const userInvites = {
	/**
	 * Description: Get list of user invites with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
	 * @param {number} limit - (optional) Count user invites into response. Starts from >= 1
	 * @param {string} sort - (optional) Sort user invites by specific field
	 * @param {string} query - (optional) Your specific search query
	 * @returns {<Page<InviteUserModel>>} ` Promise<AxiosResponse<Page<InviteUserModel>>>`
	 *
	 * ### Example
	 *
	 * `getUserInvites(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")`
	 */
	getUserInvites(pageNumber?: number, limit?: number, sort?: string, query?: string) {
		return api.get<any, Page<InviteUserModel>>(`${USER_INVITES_URL}/users`, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				sort: sort,
				query: query,
			},
		});
	},

	/**
	 *
	 * Description: Get full invite info by token
	 *
	 * @param {string} token - (required)
	 * @returns {<InviteUserModel>} `Promise<AxiosResponse<InviteUserModel>>`
	 *
	 * ### Example
	 *
	 * getUserInviteInfoByToken('0ah7sd087has8d7h')
	 */
	getUserInviteInfoByToken(token: string) {
		return api.get<any, InviteUserModel>(`${USER_INVITES_URL}/users/byToken/${token}`);
	},

	/**
	 *
	 * Description: Sending invite to the user
	 *
	 * @param {any} inviteData - (required) data from invite form
	 * @param {string} templateId - (required) id of the email template
	 * @param {string} company - (required) name of the inviter company
	 * @returns {<any>} ` Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * `sendUserInvite('ha9s8hd9a8shd','company', {});`
	 */
	sendUserInvite(company: string, inviteData: any, templateId = 'default') {
		return this.sendInvite('users', company, inviteData, { userInviteTemplateId: templateId });
	},

	/**
	 *
	 * Description: Edit developer invite
	 *
	 * @param {string} inviteData - (required) data from invite form
	 * @param {any} inviteId - (required) id of the invite
	 * @returns {<any>} `Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * editUserInvite('807has87dha8', {})
	 */
	editUserInvite(inviteId: string, inviteData: any) {
		return api.post<any>(`${USER_INVITES_URL}/users/byId/${inviteId}`, { body: inviteData });
	},

	/**
	 *
	 * Description: Delete developer invite
	 *
	 * @param {string} inviteId - (required)
	 * @returns {<any>} `Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * deleteUserInvite('uahs09d8a9sd8h')
	 */
	deleteUserInvite(inviteId: string) {
		return api.delete<any>(`${USER_INVITES_URL}/users/byId/${inviteId}`);
	},

	/**
	 *
	 * Description: Get list of developer invites with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1
	 * @param {number} limit - (optional) Count user invites into response. Starts from >= 1
	 * @param {string} sort - (optional) Sort user invites by specific field
	 * @param {string} query - (optional) Your specific search query
	 * @returns {<Page<InviteDeveloperModel>>} ` Promise<AxiosResponse<Page<InviteDeveloperModel>>>`
	 *
	 * ### Example
	 *
	 * `getDeveloperInvites(1,10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")`
	 */
	getDeveloperInvites(pageNumber?: number, limit?: number, sort?: string, query?: string) {
		return api.get<any, Page<InviteDeveloperModel>>(`${USER_INVITES_URL}/developers`, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				sort: sort,
				query: query,
			},
		});
	},

	/**
	 *
	 * Description: Sending invite to the user
	 *
	 * @param {any} inviteData - (required) data from invite form
	 * @param {string} templateId - (required) id of the email template
	 * @param {string} company - (required) name of the inviter company
	 * @returns {<any>} `Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * `sendDeveloperInvite('company', {})`
	 */
	sendDeveloperInvite(company: string, inviteData: any, templateId = 'default') {
		return this.sendInvite('developers', company, inviteData, {
			developerInviteTemplateId: templateId,
		});
	},

	/**
	 *
	 * Description: Edit developer invite
	 *
	 * @param {any} inviteData - (required) data from invite form
	 * @param {string} inviteId - (required) id of the invite
	 * @returns {<any>} `Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * `editDeveloperInvite('9ahs09d8jas9d8', {})`
	 */
	editDeveloperInvite(inviteId: string, inviteData: any) {
		return api.post<any>(`${USER_INVITES_URL}/developers/byId/${inviteId}`, { body: inviteData });
	},

	/**
	 *
	 * Description: In order to validate the invite token and get the details for the invite
	 *
	 * @param {string} token - (required)
	 * @returns {<InviteDeveloperModel>} `Promise<AxiosResponse<InviteDeveloperModel>>`
	 *
	 * ### Example
	 *
	 * `getDeveloperInviteInfoByToken('9ahs09d8jas9d')`
	 */
	getDeveloperInviteInfoByToken(token: string) {
		return api.get<any, InviteDeveloperModel>(`${USER_INVITES_URL}/developers/byToken/${token}`);
	},

	/**
	 *
	 * Description: Delete user invite
	 *
	 * @param {string} inviteId - (required)
	 * @returns {<any>} `Promise<AxiosResponse<any>>`
	 *
	 * ### Example
	 *
	 * `deleteDeveloperInvite('9ahs09d8jas9d')`
	 */
	deleteDeveloperInvite(inviteId: string) {
		return api.delete<any>(`${USER_INVITES_URL}/developers/byId/${inviteId}`);
	},

	/**
	 *
	 * Description: Send invite to user or developer
	 *
	 * @param {'developers'| 'users'} userType - (required) Chose user type
	 * @param {string} company - (required) Company name
	 * @param {any} userInviteData - (required) Invite data
	 * @param {{developerInviteTemplateId} | {userInviteTemplateId}} inviteIDs - (required)
	 * @returns {<any>} ` Promise<AxiosResponse<any>>`
	 *
	 *
	 * ### Example
	 *
	 * `sendInvite('developers', 'company', {}, 'aosudj9a8sjd98')`
	 */
	sendInvite(
		userType: 'developers' | 'users',
		company: string,
		userInviteData: any,
		inviteIDs: { developerInviteTemplateId: string } | { userInviteTemplateId: string },
	) {
		const body = {
			...userInviteData,
			...inviteIDs,
			customData: { company, ...(userInviteData?.customData ? userInviteData.customData : {}) },
		};
		return api.post<any>(`${USER_INVITES_URL}/${userType}`, { body });
	},
};
