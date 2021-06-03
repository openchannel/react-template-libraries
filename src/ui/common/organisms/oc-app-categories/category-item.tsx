import * as React from 'react';
import './style.scss';

export interface CategoryProps {
	categoryCardClass?: string;
	categoryLogo?: string;
	categoryName: string;
	categoryBackgroundImage?: string;
	categoryTitleColor?: string;
}

export const CategoryItem: React.FC<CategoryProps> = (props) => {
	const {
		categoryCardClass,
		categoryLogo,
		categoryName,
		categoryBackgroundImage,
		categoryTitleColor,
	} = props;

	return (
		<div
			className={`categories__card ${categoryCardClass}`}
			style={{ backgroundImage: `${categoryBackgroundImage || 'none'}` }}
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
