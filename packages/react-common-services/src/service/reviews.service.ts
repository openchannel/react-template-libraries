import { api } from '../lib/api';
import { Page } from '../model/api/page.model';
import { CreateReviewRequest, ReviewResponse } from '../model/api/review.model';
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
	 *
	 * * ### Example:
	 *``
	 * getReviewsByAppId('a7hsd87ha8sdh8a7sd',1, 10, "{"name": 1}", "{"name": {"$in":["first", "second"]}}")
	 *``
	 */
	getReviewsByAppId: (appId: string, sort?: string, filter?: string, page = 0, limit = 0) => {
		const params = configureReviewsParams(appId, sort, filter, page, limit);

		// let reviewPage: Page<Review>;

		return api.get<any, Page<OCReviewDetailsResponse>>(REVIEWS_URL, { params });
	},
	/**
	 * Description: Create the new review.
	 * @param {ReviewResponse} reviewData data of the review. Must contain fields `appId`, `headline`, `rating`,
	 * `description` and optional field `customData`.
	 *
	 * ### Example:
	 * `createReview({appId: 5565322ae4b0a70b13a4563b, headline: "Good App", rating: 400, description: ""})`
	 */
	createReview: (reviewData: ReviewResponse | CreateReviewRequest) => {
		return api.post(REVIEWS_URL, { body: reviewData });
	},

	/**
	 * Description: Updating an app review allows users to modify their reviews.
	 * @param {ReviewResponse} reviewData data of the review. Must contain fields `reviewId`, `headline`, `rating`,
	 * `description` and optional field `customData`.
	 *
	 * ### Example:
	 * `updateReview({reviewId: "5565322ae4b0a70b13a4563b", headline: "Good App", rating: 400, description: ""})`
	 */
	updateReview: (reviewData: any) => {
		return api.patch(`${REVIEWS_URL}/${reviewData.reviewId}`, { body: reviewData });
	},

	/**
	 * Description: Returns a single, specific, review record.
	 * @param {string} reviewId ID of the review.
	 *
	 * ### Example:
	 * `getOneReview("5565322ae4b0a70b13a4563b")`
	 */
	getOneReview: (reviewId: string) => {
		return api.get(`${REVIEWS_URL}/${reviewId}`);
	},

	/**
	 * Description: Deletes a review. Returns an empty response on the success.
	 * @param reviewId the ID of the review
	 *
	 * ### Example:
	 * `deleteReview("5565322ae4b0a70b13a4563b")`
	 */
	deleteReview: (reviewId: string) => {
		return api.delete(`${REVIEWS_URL}/${reviewId}`);
	},
};
