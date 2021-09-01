import * as React from 'react';

import OcButtonComponent from '../../atoms/oc-button/oc-button';
import arrowIcon from '../../../../assets/img/arrow-left.svg';

import './style.scss';

export interface NavigationBreadcrumbsProps {
	navigateText?: string;
	navigateClick?: React.MouseEventHandler;
	pageTitle: string;
	buttonText?: string;
	buttonClick?: React.MouseEventHandler;
}

export const NavigationBreadcrumbs: React.FC<NavigationBreadcrumbsProps> = (props) => {
	const { navigateText, navigateClick, pageTitle, buttonText, buttonClick } = props;

	return (
		<div className="container main-container">
			<div className="main-container__page-title">
				{navigateText && (
					<div
						className="main-container__page-title__router-navigate"
						onClick={navigateClick}
						role="button"
						tabIndex={0}
					>
						<img src={arrowIcon} alt="arrow-icon" />
						<a className="main-container__page-title-breadcrumbs">{navigateText}</a>
					</div>
				)}
				<h3 className="main-container__page-title__title">{pageTitle}</h3>
			</div>
			{buttonText && (
				<OcButtonComponent customClass="main-container__custom-button" onClick={buttonClick}>
					{buttonText}
				</OcButtonComponent>
			)}
		</div>
	);
};
