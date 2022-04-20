//commit 00686b99cbb608a87aa6e7dd140ba71967237ae2 Author: Julia Date: 05.11.20, 13:28
import * as React from 'react';

import { ReactComponent as StarIcon } from '../../../../assets/img/star.svg';

import { Star } from './star';

import './style.scss';

const RatingVariants = {
	SINGLE_STAR_TYPE: 'single-star',
	MULTI_STAR_TYPE: 'multi-star',
} as const;

export interface RatingProps {
	/**
	 * Name
	 * */
	name?: string;
	/**
	 * Type of Rating to show. Can be 'single-star' or 'multi-star'.
	 * @default single-star
	 * */
	type?: typeof RatingVariants[keyof typeof RatingVariants];
	/**
	 * Rating number
	 * @default 0
	 * */
	rating?: number;
	/**
	 * Count of the reviews
	 * @default 0
	 * */
	reviewCount?: number;
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
	/**
	 * A callback fired when the rating is changed.
	 * */
	onChange?: (rating: number) => void;
	/**
	 * A callback fired when the rating is blurred.
	 * */
	onBlur?: () => void;
	/**
	 * Disabling the rating component. That the user can not interact with it.
	 * Component will be used only for displaying
	 * @default false
	 */
	disabled?: boolean;
}

export const OcRatingComponent: React.FC<RatingProps> = (props) => {
	const {
		rating = 0,
		reviewCount = 0,
		label = '',
		type = RatingVariants.SINGLE_STAR_TYPE,
		labelClass = 'font-m font-med',
		className,
		onChange,
		onBlur,
		disabled = false,
	} = props;

	const [hoveredStar, setHoveredStar] = React.useState<number | null>(null);

	const stars = React.useMemo(() => Array.from({ length: 5 }, (_, i) => i + 1), []);

	if (type === RatingVariants.SINGLE_STAR_TYPE) {
		return (
			<div className={className || 'oc-rating-single'}>
				<StarIcon className="oc-rating-single__rating-star" viewBox="0 0 18 18" />
				<span className={`oc-rating-single__label ${labelClass}`}>
					{Number(rating).toFixed(1)} ({reviewCount}
					{label ? ` ${label}` : ''})
				</span>
			</div>
		);
	}

	return (
		<div className={className || 'oc-rating-multi'} onMouseLeave={onBlur}>
			{stars.map((star) => (
				<Star
					key={star}
					star={star}
					rating={hoveredStar ? hoveredStar : rating}
					disabled={disabled}
					onHover={setHoveredStar}
					onLeave={() => setHoveredStar(null)}
					onClick={onChange}
				/>
			))}
		</div>
	);
};

export default OcRatingComponent;
