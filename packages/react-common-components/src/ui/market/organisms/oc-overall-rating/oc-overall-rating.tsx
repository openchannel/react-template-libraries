import * as React from 'react';

import { OcLabelComponent } from '../../../common';
import { OcRatingComponent } from '../../atoms';

import ProgressBar from './components/rating-progress-bar';

import './style.scss';

export interface OverallRatingProps {
	rates?: number[];
	overallReviewLabel?: string;
	allReviewSummary?: {
		rating: number;
		reviewCount: number;
		1: number;
		2: number;
		3: number;
		4: number;
		5: number;
	};
}

export const OcOverallRating: React.FC<OverallRatingProps> = (props) => {
	const {
		rates = [5, 4, 3, 2, 1],
		overallReviewLabel = 'Overall rating',
		allReviewSummary = {
			rating: 0,
			reviewCount: 0,
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
		},
	} = props;

	return (
		<div className="overall-rating">
			<div className="overall-rating__header">
				<div className="overall-rating__rating">
					<h1 className="overall-rating__rating-result">{allReviewSummary.rating}</h1>
					<span className="overall-rating__rating-max">/5.0</span>
				</div>
				<span id="reviewLabel" className="overall-rating__header-label">
					{overallReviewLabel}
				</span>
			</div>
			<div className="overall-rating__reviews-header">
				<OcLabelComponent
					customClass="overall-rating__reviews-header-label review-label"
					text="Based on"
				/>
				<span id="reviewCount" className="overall-rating__reviews-header-reviews-count label-blue">
					{' '}
					{allReviewSummary.reviewCount} reviews
				</span>
			</div>

			{rates.map((rate) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				const reviewsPerRate = allReviewSummary[rate];

				return (
					<div className="overall-rating__rate">
						<div className="overall-rating__rate-header">
							<OcRatingComponent rating={rate} type="multi-star" disabled />
							<span className="overall-rating__progressbar-label">
								{reviewsPerRate}/{allReviewSummary.reviewCount}
							</span>
						</div>
						<ProgressBar
							className="overall-rating__progressbar"
							value={
								allReviewSummary.reviewCount > 0
									? (reviewsPerRate / allReviewSummary.reviewCount) * 100
									: 0
							}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default OcOverallRating;
