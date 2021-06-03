//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:30
import * as React from 'react';
import { OcButtonComponent } from '../../index';
import './style.scss';

export interface GetStartedProps {
	getStartedType: 'home' | 'search';
	getStartedHeader: string;
	getStartedDescription: string;
	getStartedButtonText: string;
	getStartedImage: string;
	onClick?: React.MouseEventHandler;
}

export const OcGetStartedComponent: React.FC<GetStartedProps> = (props) => {
	const {
		getStartedType,
		getStartedHeader,
		getStartedDescription,
		getStartedButtonText,
		getStartedImage,
		onClick,
	} = props;

	return (
		<div className="get-started">
			{getStartedType === 'home' && (
				<>
					<div className="get-started__logo">
						<img src={getStartedImage} alt="logo" className="get-started__logo-image" />
					</div>
					<div className="get-started__info">
						<h3 className="get-started__info-heading">{getStartedHeader}</h3>
						<p className="get-started__info-desc">{getStartedDescription}</p>
						<OcButtonComponent
							customClass="get-started__button"
							type="primary"
							text={getStartedButtonText}
							onClick={onClick}
						/>
					</div>
				</>
			)}
			{getStartedType === 'search' && (
				<div className="get-started get-started_search">
					<h1>{getStartedHeader}</h1>
					<div className="get-started_search__button">
						<OcButtonComponent
							customClass="get-started__button-wrapper"
							type="primary"
							text={getStartedButtonText}
							onClick={onClick}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
