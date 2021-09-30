import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';
import { CreateOwnershipModel } from '../model/api/ownership.model';

const OWNERSHIP_URL = 'v2/ownership';

export const ownershipService = {
	/**
	 *
	 * Description: Start new Ownership with provided data
	 *
	 * ### Example
	 *
	 * `installOwnership(
	 * {
	 *   appId: '0a8hs09dhas09d8h9',
	 *   modelId: '9a8hs9a86sgd97a6sgd'
	 * },
	 * {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"}
	 * )`
	 */
	installOwnership: (ownership: CreateOwnershipModel, headers: ReqHeaders) => {
		return api.post(`${OWNERSHIP_URL}/install`, { body: ownership, headers: headers });
	},

	/**
	 *
	 * Description: End Ownership with Id
	 *
	 * @param {CreateOwnershipModel} ownership - (required) Ownership Data to uninstall
	 *
	 * ### Example
	 *
	 * `uninstallOwnership('0a8hs09dhas09d8h9', {"Authorization":"Bearer as98hd90ahsd98has9d8ha98sd"})`
	 */
	uninstallOwnership: (ownershipId: string, headers: ReqHeaders) => {
		return api.post(`${OWNERSHIP_URL}/uninstall/${ownershipId}`, { body: {}, headers });
	},
};
