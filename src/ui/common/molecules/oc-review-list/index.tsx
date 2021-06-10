//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';
import { OcRatingComponent } from '../../../market/atoms/oc-rating/index';
import { OcButtonComponent } from '../../index';
import './style.scss';

export interface ReviewListProps {
	/**
	 * Upper heading on review list
	 */
	reviewListTitle: string;
	/**
	 * writeReview - onClick handler
	 */
	writeReview?: (e: React.SyntheticEvent<unknown, Event>) => void;
	/**
	 * Reviews array
	 */
	reviewList?: Array<any>;
	/**
	 * maxReviewDisplay
	 */
	maxReviewDisplay?: number;
	/**
	 * no review message text
	 */
	noReviewMessage?: string;
}

export const OcReviewListComponent: React.FC<ReviewListProps> = (props) => {
	const {
		reviewListTitle = 'Most recent reviews',
		reviewList = [],
		writeReview,
		maxReviewDisplay = 1,
		noReviewMessage = 'No Review for this app',
	} = props;

	const [isToggled, toggleDisplay] = React.useState(false);
	const displayedItems = [...reviewList].splice(0, maxReviewDisplay);

	return (
		<div className="review-list">
			<div className="review-list__header">
				<h4 className="review-list__header-heading">{reviewListTitle}</h4>
				<OcButtonComponent
					onClick={writeReview}
					text="Write a Review"
					type="primary"
					customClass="review-list__header-button"
				/>
			</div>
			{reviewList && reviewList!.length > 0 ? (
				<div>
					{!isToggled
						? displayedItems.map((review, index) => (
								<div className="review-list__one-review" key={index}>
									<h5 className="review-list__one-review-heading">{review.reviewOwnerName}</h5>
									<div className="review-list__one-review-rating-label">Rating</div>
									<OcRatingComponent
										rating={review.rating / 100}
										type="multi-star"
										className="review-list__one-review-rating"
									/>
									<div className="review-list__one-review-text">{review.review}</div>
									<hr />
								</div>
						  ))
						: reviewList.map((review, index) => (
								<div className="review-list__one-review" key={index}>
									<h5 className="review-list__one-review-heading">{review.reviewOwnerName}</h5>
									<div className="review-list__one-review-rating-label">Rating</div>
									<OcRatingComponent
										rating={review.rating / 100}
										type="multi-star"
										className="review-list__one-review-rating"
									/>
									<div className="review-list__one-review-text">{review.review}</div>
									<hr />
								</div>
						  ))}
					{reviewList.length > maxReviewDisplay && (
						<span className="review-list__drop-down" onClick={() => toggleDisplay(!isToggled)}>
							{!isToggled ? 'View all reviews (' + reviewList?.length + ')' : 'Collapse'}
						</span>
					)}
				</div>
			) : (
				<h4 className="review-list__empty-result-heading">{noReviewMessage}</h4>
			)}
		</div>
	);
};
