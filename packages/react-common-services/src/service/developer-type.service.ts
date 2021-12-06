import { api } from '../lib/api';

/**
 * Description: API service for getting Developer Type related data. <br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/developerTypes'<br>
 *
 * GET 'v2/developerTypes/{developerTypeId}'<br>
 */

const DEV_ACCOUNT_TYPES_URL = 'v2/developers/this';

export const DeveloperTypeService = {
	/**
	 *
	 * Description: Get developer type data
	 *
	 * @param {string} developerTypeId
	 * @param {any} httpOptions - (optional)
	 * @returns {DeveloperTypeModel} `DeveloperTypeModel`
	 *
	 */
	getDeveloperType(developerTypeId: string, httpOptions?: any) {
		const mainUrl = `${DEV_ACCOUNT_TYPES_URL}/${developerTypeId}`;
		return api.get(mainUrl, httpOptions);
	},

	/**
	 *
	 * Description: Get list of all developer types with pagination
	 *
	 * @param {number} pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count apps into response. Starts from >= 1.
	 * @param {string} query - (optional) Your specific search query.
	 * @returns {Page<DeveloperTypeModel>} `Page<DeveloperTypeModel>`
	 *
	 * ### Example
	 *
	 * `getAllDeveloperTypes(1,10,"{"name": {"$in":["first", "second"]}}")`
	 */
	getAllDeveloperTypes(pageNumber?: number, limit?: number, query?: string) {
		return api.get(DEV_ACCOUNT_TYPES_URL, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				query: query,
			},
		});
	},
};
