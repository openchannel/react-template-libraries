//commit 1f8476fdd1021aa7c3062f340499ee030bcba500 Author: Julia Date: 19.05.21, 14:35
import * as React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CarouselProps, ArrowProps, ResponsiveType } from 'react-multi-carousel/lib/types';
import LeftArrowIcon from '../../../../assets/img/arrow-left-analog.svg';
import RightArrowIcon from '../../../../assets/img/arrow-right-analog.svg';
import { CategoryItem, CategoryProps } from './category-item';
import './style.scss';

const CustomLeftArrow = (props: ArrowProps) => {
	const { onClick } = props;
	return (
		<div className="categories__carousel-nav categories__carousel-nav-left" onClick={onClick}>
			<LeftArrowIcon />
		</div>
	);
};
const CustomRightArrow = (props: ArrowProps) => {
	const { onClick } = props;
	return (
		<div className="categories__carousel-nav categories__carousel-nav-right" onClick={onClick}>
			<RightArrowIcon />
		</div>
	);
};

export interface AppCategoriesProps extends CarouselProps {
	/**
	 * responsive config
	 */
	customOptions: ResponsiveType;
	/**
	 * timing of slides changing
	 */
	navSpeed: number | undefined;
	/**
	 * ability to drag with touch(mobile), boolean attribute
	 */
	touchDrag: boolean | undefined;
	/**
	 * ability to drag with mouse, boolean attribute
	 */
	mouseDrag: boolean | undefined;
	/**
	 * enable or disable dots in carousel, boolean attribute
	 */
	dots: boolean | undefined;
	/**
	 * show previous and next set of items partially
	 */
	autoWidth: boolean | undefined;
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
		customOptions,
		navSpeed,
		touchDrag,
		mouseDrag,
		dots,
		autoWidth,
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
				removeArrowOnDeviceType={['tablet', 'mobile']}
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
