//commit 00686b99cbb608a87aa6e7dd140ba71967237ae2 Author: Julia Date: 05.11.20, 13:28
import * as React from 'react';

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
	index: number;
	rating: number;
}

export const Star: React.FC<StarProps> = ({ index, rating }) => {
	const isFilled = index < Math.trunc(rating);
	const isHalfFilled = index === Math.trunc(rating) && !Number.isInteger(rating);

	return (
		<span className="oc-rating-multi__star">
			{isFilled && <span {...getStarProps(rating).filled}>&#9733;</span>}
			{isHalfFilled && <span {...getStarProps(rating).halfFilled}>&#9733;</span>}
			{!isFilled && <>&#9733;</>}
		</span>
	);
};
