//commit 1f8476fdd1021aa7c3062f340499ee030bcba500 Author: Julia Date: 19.05.21, 14:35
import * as React from 'react';
// import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import { CarouselProps, ArrowProps, ResponsiveType } from 'react-multi-carousel/lib/types';

const CustomRightArrow = (props: ArrowProps) => {
	const { onClick } = props;
	return <button onClick={onClick} />;
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
}

export const OcAppCategoriesComponent: React.FC<AppCategoriesProps> = (props) => {
	const { customOptions, navSpeed, touchDrag, mouseDrag, dots, autoWidth } = props;
	return (
		<Carousel
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
			containerClass=""
			itemClass=""
			infinite={true}
		>
			<div>Child</div>
		</Carousel>
	);
};
