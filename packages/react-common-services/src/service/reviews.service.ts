import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { OCReviewDetailsResponse } from '../model/components/frontend.model';
import { QueryUtil } from '../util/query.util';

const REVIEWS_URL = 'v2/reviews';

const configureReviewsParams = (
	appId: string,
	sort?: string,
	filter?: string,
	page = 0,
	limit = 0,
) => {
	const params = new URLSearchParams();

	const queries = [`{'appId':'${appId}'}`];
	if (filter) {
		queries.push(filter);
	}

	params.append('query', QueryUtil.getAndQuery(queries));

	if (sort) {
		params.append('sort', sort);
	}

	if (page > 0 && limit > 0) {
		params.append('pageNumber', String(page));
		params.append('limit', String(limit));
	}

	return params;
};

/**
 * Description: API service for getting reviews.<br>
 * Endpoints:<br>
 * GET 'v2/reviews'<br>
 */
export const reviews = {
	/**
	 *
	 * Description: Get revies by App id and merge it with user data with pagination
	 *
	 * @param {string} appId - (required)
	 * @param {number} page - (optional) Current page index. Starts from >= 1.
	 * @param {number} limit - (optional) Count Reviews into response. Starts from >= 1.
	 * @param {string} sort - (optional) Sort Reviews by specific field.
	 * @param {string} filter - (optional) Your specific search filter.
	 * @returns {Observable<Page<OCReviewDetailsResponse>>} Observable<Page<OCReviewDetailsResponse>>
	 *
	 * * ### Example:
	 *``
	 * getReviewsByAppId('a7hsd87ha8sdh8a7sd',1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
	 *``
	 */
	getReviewsByAppId: (
		appId: string,
		sort?: string,
		filter?: string,
		page = 0,
		limit = 0,
	): Promise<Page<OCReviewDetailsResponse>> => {
		const params = configureReviewsParams(appId, sort, filter, page, limit);

		// let reviewPage: Page<Review>;

		return api.get(REVIEWS_URL, params);
		// .pipe(
		// 	tap((pageData: Page<Review>) => (reviewPage = pageData)),
		// 	mergeMap((pageData: Page<Review>) => this.usersService.getUsersByIds(pageData.list.map(value => value.userId))),
		// 	map((userPage: Page<User>) => {
		// 		const idToUser = new Map<string, User>();
		// 		userPage.list.forEach(user => idToUser.set(user.userId, user));
		//
		// 		const reviews = reviewPage.list.map(review => {
		// 			const reviewDetail: OCReviewDetailsResponse = {
		// 				rating: review.rating,
		// 				review: review.description,
		// 				reviewOwnerName: idToUser.get(review.userId).name,
		// 			};
		// 			return reviewDetail;
		// 		});
		//
		// 		return {
		// 			...reviewPage,
		// 			list: reviews,
		// 		};
		// 	}),
		// );
	},
};
