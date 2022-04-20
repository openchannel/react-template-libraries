import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { FilterResponse, SortResponse } from '../model/components/frontend.model';

const FRONTEND_URL = 'v2/frontEnd';

export const frontend = {
	/**
	 *
	 * Description: Get available sorts for frontend
	 * * ### Example:
	 * `getSorts();`
	 */
	getSorts: () => {
		return api.get<any, Page<SortResponse>>(`${FRONTEND_URL}/sorts`);
	},

	/**
	 *
	 * Description: Get available filters for frontend
	 * * ### Example:
	 * `getFilters();`
	 */
	getFilters: () => {
		return api.get<any, Page<FilterResponse>>(`${FRONTEND_URL}/filters`);
	},
};
