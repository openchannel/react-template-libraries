import * as React from 'react';
import { NavbarElementProps } from 'react-day-picker';

import { ReactComponent as PrevIcon } from '../../../../assets/img/arrow-left-analog.svg';
import { ReactComponent as NextIcon } from '../../../../assets/img/arrow-right-analog.svg';

import { styleLeft, styleRight } from './constants';

export const Navbar = ({ onPreviousClick, onNextClick, className }: NavbarElementProps) => {
	const handlePrevClick = () => onPreviousClick();
	const handleNextClick = () => onNextClick();

	return (
		<div className={className}>
			<PrevIcon style={styleLeft} onClick={handlePrevClick} />
			<NextIcon style={styleRight} onClick={handleNextClick} />
		</div>
	);
};
