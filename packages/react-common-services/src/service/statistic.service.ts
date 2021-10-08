import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';

const STATS_URL = 'v2/stats';

export const statisticService = {
	/**
	 * Description: Increment visits to app
	 *
	 * @param {string} appId - (required)
	 * @param {ReqHeaders} headers - (optional)
	 *
	 * ### Example
	 *
	 * `recordVisitToApp('a2sd876ags7dd6g')`
	 *
	 */
	recordVisitToApp: (appId: string, headers?: ReqHeaders) => {
		const mainUrl = `${STATS_URL}/increment/views`;
		return api.post(mainUrl, { body: appId, headers: headers || {} });
	},
	/**
	 * Description: Increment app statistic field
	 *
	 * @param {string} field - (required)
	 * @param {string} appId - (required)
	 * @param {ReqHeaders} headers - (optional)
	 *
	 * ### Example
	 *
	 * `record('installs','a2sd876ags7dd6g')`
	 *
	 */
	record: (field: string, appId: string, headers?: ReqHeaders) => {
		const mainUrl = `${STATS_URL}/increment/${field}`;
		return api.post(mainUrl, { body: appId, headers: headers || {} });
	},
};
