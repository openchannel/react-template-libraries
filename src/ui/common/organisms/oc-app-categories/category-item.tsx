import * as React from 'react';
import './style.scss';

export interface CategoryProps {
	categoryCardClass?: string;
	categoryLogo?: string;
	categoryName: string;
	// categoryQuery?: any;
	categoryBackgroundImage?: string;
	categoryTitleColor?: string;
}

export const CategoryItem: React.FC<CategoryProps> = (props) => {
	const {
		categoryCardClass,
		categoryLogo,
		categoryName,
		// categoryQuery,
		categoryBackgroundImage,
		categoryTitleColor,
	} = props;

	// const navigateToCategory = (query) => {};

	return (
		<div
			className={`categories__card ${categoryCardClass}`}
			style={{ backgroundImage: `${categoryBackgroundImage || 'none'}` }}
			// onClick={navigateToCategory(categoryQuery)}
		>
			<div className="categories__card-logo">
				<img src={categoryLogo} alt="category-icon" />
			</div>
			<div
				className="categories__card-text"
				style={{ color: `${categoryTitleColor || 'transparent'}` }}
			>
				{categoryName || 'All Apps'}
			</div>
		</div>
	);
};
