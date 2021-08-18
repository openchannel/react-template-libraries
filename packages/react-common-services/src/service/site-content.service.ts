import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';
import { Page } from '../model/api/page.model';
import { SiteContentResponse } from '../model/api/custom-content.model';

const CONTENT_URL = 'v2/sites';

export const siteContent = {
	getAllContent: (
		pageNumber: number,
		limit: number,
		sort?: string,
		query?: string,
		headers?: ReqHeaders
	) =>
		api.get<unknown, Page<SiteContentResponse>>(`${CONTENT_URL}/content`, {
			headers,
			params: {
				pageNumber: String(pageNumber),
				limit: String(limit),
				sort,
				query,
			},
		}),
};
