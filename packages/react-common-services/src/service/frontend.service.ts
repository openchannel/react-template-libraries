import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { FilterResponse, SortResponse } from '../model/components/frontend.model';

const FRONTEND_URL = 'v2/frontend';

export const frontend = {
	/**
	 *
	 * Description: Get available sorts for frontend
	 * @returns {Promise<Page<SortResponse>>} `Promise<Page<SortResponse>>`
	 * * ### Example:
	 * `getSorts();`
	 */
	getSorts: (): Promise<Page<SortResponse>> => {
		return api.get(`${FRONTEND_URL}/sorts`);
	},

	/**
	 *
	 * Description: Get available filters for frontend
	 * @returns {Promise<Page<FilterResponse>>} `Promise<Page<FilterResponse>>`
	 * * ### Example:
	 * `getFilters();`
	 */
	getFilters: (): Promise<Page<FilterResponse>> => {
		return api.get(`${FRONTEND_URL}/filters`);
	},
};
