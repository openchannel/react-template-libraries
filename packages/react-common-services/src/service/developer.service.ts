import { api } from '../lib/api';
import { DeveloperUpdateModel } from '../model/api/developer.model';

const DEV_ACCOUNT_TYPES_URL = 'v2/developers/this';

/**
 * Description: API service for getting and modifying Developer model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developers/this'<br>
 *
 * PATCH 'v2/developers/this'<br>
 */
export const developerService = {
	/**
	 *
	 * Description: Get Data about developer
	 *
	 * @returns {DeveloperModel}
	 *
	 */
	getDeveloper() {
		return api.get(`${DEV_ACCOUNT_TYPES_URL}`);
	},

	/**
	 *
	 * Description: Update developer data
	 *
	 * @param {DeveloperUpdateModel} updateDeveloperRequest - (required) Developer model to update
	 * @returns {DeveloperModel}
	 *
	 */
	updateDeveloper(updateDeveloperRequest: DeveloperUpdateModel) {
		return api.patch(`${DEV_ACCOUNT_TYPES_URL}`, { body: updateDeveloperRequest });
	},
};
