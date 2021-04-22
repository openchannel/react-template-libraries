import * as React from 'react';

import { Star } from './star';
import './styles.scss';


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
}

export const Rating: React.FC<RatingProps> = (props) => {
	const {
		rating = 0,
		reviewCount = 0,
		label = '',
		type = RatingVariants.SINGLE_STAR_TYPE,
		labelClass = 'font-m font-med',
	} = props

	const [stars] = React.useState(Array.from({ length: 5 }, (_, k) => k))

	if (type === RatingVariants.SINGLE_STAR_TYPE) {
		return (
			<div className="oc-rating-single">
				<span className={`oc-rating-single__label ${labelClass}`}>
					{rating} ({reviewCount}{label ? ` ${label}` : ''})
				</span>
			</div>
		)
	}

	return (
		<div className="oc-rating-multi">
			{stars.map((number) => <Star key={number} index={number} rating={rating} />)}
		</div>
	);
};
