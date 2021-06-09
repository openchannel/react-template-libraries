import * as React from 'react';
import 'react-multi-carousel/lib/styles.css';
import { ArrowProps } from 'react-multi-carousel/lib/types';
import LeftArrowIcon from '../../../../assets/img/arrow-left-analog.svg';
import RightArrowIcon from '../../../../assets/img/arrow-right-analog.svg';
import './style.scss';

export const CustomLeftArrow = (props: ArrowProps) => {
	const { onClick } = props;
	return (
		<div className="categories__carousel-nav categories__carousel-nav-left" onClick={onClick}>
			<LeftArrowIcon />
		</div>
	);
};
export const CustomRightArrow = (props: ArrowProps) => {
	const { onClick } = props;
	return (
		<div className="categories__carousel-nav categories__carousel-nav-right" onClick={onClick}>
			<RightArrowIcon />
		</div>
	);
};
