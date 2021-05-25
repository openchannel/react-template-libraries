//commit 00686b99cbb608a87aa6e7dd140ba71967237ae2 Author: Julia Date: 05.11.20, 13:28
import * as React from 'react';

import StarIcon from '../../../../assets/img/star.svg';

import { Star } from './star';

import './style.scss';

const RatingVariants = {
	SINGLE_STAR_TYPE: 'single-star',
	MULTI_STAR_TYPE: 'multi-star',
} as const;

export interface RatingProps {
	/**
	 * Type of Rating to show. Can be 'single-star' or 'multi-star'.
	 * @default single-star
	 * */
	type?: typeof RatingVariants[keyof typeof RatingVariants];
	/**
	 * Rating number
	 * @default 0
	 * */
	rating: number;
	/**
	 * Count of the reviews
	 * @default 0
	 * */
	reviewCount: number;
	/**
	 * Text that can be added near the review count
	 * @default
	 * */
	label?: string;
	/**
	 * List of the public classes that can be added to the label
	 * @default font-m font-med
	 * */
	labelClass?: string;
	/**
	 * The class will be assigned to the root element. Children elements do not change.
	 */
	className?: string;
}

export const OcRatingComponent: React.FC<RatingProps> = (props) => {
	const {
		rating = 0,
		reviewCount = 0,
		label = '',
		type = RatingVariants.SINGLE_STAR_TYPE,
		labelClass = 'font-m font-med',
		className,
	} = props;

	const [stars] = React.useState(Array.from({ length: 5 }, (_, k) => k));

	if (type === RatingVariants.SINGLE_STAR_TYPE) {
		return (
			<div className={className || 'oc-rating-single'}>
				<StarIcon className="oc-rating-single__rating-star" style={{ width: 18, height: 18 }} />
				<span className={`oc-rating-single__label ${labelClass}`}>
					{Number(rating).toFixed(1)} ({reviewCount}
					{label ? ` ${label}` : ''})
				</span>
			</div>
		);
	}

	return (
		<div className={className || 'oc-rating-multi'}>
			{stars.map((number) => (
				<Star key={number} index={number} rating={Number(Number(rating).toFixed(1))} />
			))}
		</div>
	);
};
