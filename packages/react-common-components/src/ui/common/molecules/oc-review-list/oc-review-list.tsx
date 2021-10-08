//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 author: Julia Date: 12.05.21 18:29
import * as React from 'react';

import OcRatingComponent from '../../../market/atoms/oc-rating';
import OcButtonComponent from '../../atoms/oc-button/oc-button';
import { OcDropdownButton } from '../oc-dropdown';
import { DropdownListItem } from './review-list-dropdown-item';
import { titleCase } from '../../../../lib';

import './style.scss';

type Option = {
	label: string;
	[key: string]: any;
};

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
	 * Write review permission
	 */
	writeReviewPermission?: boolean;
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
	/**
	 * Current userId prop is used to compute indicate edit/delete review or not
	 */
	currentUserId?: string;
	/**
	 * selectedAction prop is used to compute if we want to edit or delete review
	 */
	selectedAction?: Option;
	/**
	 * setSelectedAction prop is used to compute if we want to edit or delete review
	 */
	setSelectedAction: (option: Option, e: React.SyntheticEvent<unknown, Event>) => void;
	/**
	 * MenuIcon to display toggle image on edit or delete(ex. down arrow)
	 */
	dropdownDefaultIcon?: any;
	/**
	 * MenuIcon to display toggle image on edit or delete(ex. up arrow)
	 */
	dropdownActiveIcon?: any;
	/**
	 * Edit, delete or other action items in array
	 */
	dropdownMenuOptions?: string[];
}

export const OcReviewListComponent: React.FC<ReviewListProps> = (props) => {
	const {
		reviewListTitle = 'Most recent reviews',
		reviewList = [],
		writeReview,
		writeReviewPermission = false,
		maxReviewDisplay = 3,
		noReviewMessage = 'There is no review for this app',
		children,
		currentUserId,
		selectedAction,
		setSelectedAction,
		dropdownDefaultIcon,
		dropdownMenuOptions = [],
	} = props;

	const [isToggled, toggleDisplay] = React.useState(false);
	const displayedItems = [...reviewList].splice(0, maxReviewDisplay);
	const handleToggle = React.useCallback(() => toggleDisplay(!isToggled), [isToggled]);

	return (
		<div className="review-list">
			<div className="review-list__header">
				<h4 className="review-list__header-heading">{reviewListTitle}</h4>
				{writeReviewPermission && (
					<OcButtonComponent
						onClick={writeReview}
						text="Write a Review"
						type="primary"
						customClass="review-list__header-button"
					/>
				)}
			</div>
			{children}
			{reviewList && reviewList!.length > 0 ? (
				<div>
					{!isToggled
						? displayedItems.map((review, index) => (
								<div className="review-list__one-review" key={index}>
									<div className="review-list__one-review-head">
										<h5 className="review-list__one-review-heading">{review.user.name}</h5>
										{review.userId === currentUserId && (
											<div className="review-list__menu">
												<OcDropdownButton
													options={dropdownMenuOptions.map((v) => ({
														label: titleCase(v),
														value: v,
													}))}
													onSelect={setSelectedAction}
													listItem={DropdownListItem}
													listProps={{ alignRight: true }}
												>
													<img
														alt="more-icon"
														className="review-list__menu-icon-dots"
														src={dropdownDefaultIcon}
													/>
												</OcDropdownButton>
											</div>
										)}
									</div>
									<div className="review-list__one-review-rating-label">Rating</div>
									<OcRatingComponent
										rating={review.rating / 100}
										type="multi-star"
										className="review-list__one-review-rating"
										disabled
									/>
									<div className="review-list__one-review-text">{review.description}</div>
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
										disabled
									/>
									<div className="review-list__one-review-text">{review.description}</div>
									<hr />
								</div>
						  ))}
					{reviewList.length > maxReviewDisplay && (
						<span className="review-list__drop-down" onClick={handleToggle}>
							{!isToggled ? `View all reviews (${reviewList?.length})` : 'Collapse'}
						</span>
					)}
				</div>
			) : (
				<h4 className="review-list__empty-result-heading">{noReviewMessage}</h4>
			)}
		</div>
	);
};

export default OcReviewListComponent;
