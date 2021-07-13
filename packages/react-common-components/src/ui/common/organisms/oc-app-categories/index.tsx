//commit 1f8476fdd1021aa7c3062f340499ee030bcba500 Author: Julia Date: 19.05.21, 14:35
import * as React from 'react';
import Carousel from 'react-multi-carousel';
import { CarouselProps, ResponsiveType } from 'react-multi-carousel/lib/types';

import { CategoryItem, CategoryProps } from './category-item';
import { CustomLeftArrow, CustomRightArrow } from './custom-arrows';

import 'react-multi-carousel/lib/styles.css';
import './style.scss';

const defaultOptions = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
	},
};

export interface AppCategoriesProps extends Partial<CarouselProps> {
	/**
	 * responsive config
	 */
	customOptions?: ResponsiveType;
	/**
	 * timing of slides changing
	 */
	navSpeed?: number | undefined;
	/**
	 * ability to drag with touch(mobile), boolean attribute
	 */
	touchDrag?: boolean | undefined;
	/**
	 * ability to drag with mouse, boolean attribute
	 */
	mouseDrag?: boolean | undefined;
	/**
	 * enable or disable dots in carousel, boolean attribute
	 */
	dots?: boolean | undefined;
	/**
	 * show previous and next set of items partially
	 */
	autoWidth?: boolean | undefined;
	/**
	 * Title of the category section
	 */
	categoryHeaderTitle: string;
	/**
	 * Data for carousel to display
	 */
	data: Array<CategoryProps>;
}

export const OcAppCategoriesComponent: React.FC<AppCategoriesProps> = (props) => {
	const {
		customOptions = defaultOptions,
		navSpeed = 700,
		touchDrag = false,
		mouseDrag = false,
		dots = false,
		autoWidth = false,
		categoryHeaderTitle,
		data,
	} = props;
	return (
		<div className="categories">
			<h1 className="categories__heading">{categoryHeaderTitle}</h1>
			<Carousel
				arrows={data.length > 4}
				responsive={customOptions}
				ssr={false}
				autoPlay={false}
				autoPlaySpeed={navSpeed}
				swipeable={touchDrag}
				draggable={mouseDrag}
				showDots={dots}
				centerMode={autoWidth}
				keyBoardControl={false}
				customRightArrow={<CustomRightArrow />}
				customLeftArrow={<CustomLeftArrow />}
				containerClass="categories__carousel"
				infinite={true}
			>
				{data.map((item, index) => (
					<CategoryItem
						categoryCardClass={item.categoryCardClass}
						categoryLogo={item.categoryLogo}
						categoryName={item.categoryName}
						categoryBackgroundImage={item.categoryBackgroundImage}
						categoryTitleColor={item.categoryTitleColor}
						key={index}
					/>
				))}
			</Carousel>
		</div>
	);
};
