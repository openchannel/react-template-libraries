//commit 00686b99cbb608a87aa6e7dd140ba71967237ae2 Author: Julia Date: 05.11.20, 13:28
import * as React from 'react';
import { noop } from 'lodash-es';

const getStarProps = (rating: number) => {
	return {
		filled: {
			className: 'oc-rating-multi__star_filled',
		},
		halfFilled: {
			className: 'oc-rating-multi__star_half-color',
			style: { width: `${(rating % 1) * 100}%` },
		},
	};
};

export interface StarProps {
	star: number;
	rating: number;
	disabled?: boolean;
	onHover?: (star: number) => void;
	onLeave?: () => void;
	onClick?: (star: number) => void;
}

export const Star: React.FC<StarProps> = (props) => {
	const { star, rating, disabled = false, onHover = noop, onLeave = noop, onClick = noop } = props;
	const isFilled = star <= Math.trunc(rating);
	const isHalfFilled = star === Math.ceil(rating) && !Number.isInteger(rating);

	const renderStar = () => (
		<>
			{isFilled && <span {...getStarProps(rating).filled}>&#9733;</span>}
			{isHalfFilled && <span {...getStarProps(rating).halfFilled}>&#9733;</span>}
			{!isFilled && <>&#9733;</>}
		</>
	);

	return disabled ? (
		<span className="oc-rating-multi__star oc-rating-multi__star_disabled">{renderStar()}</span>
	) : (
		<span
			className="oc-rating-multi__star"
			onMouseEnter={() => onHover(star)}
			onMouseLeave={onLeave}
			onClick={() => onClick(star)}
		>
			{renderStar()}
		</span>
	);
};
