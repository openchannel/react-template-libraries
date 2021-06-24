import * as React from 'react';
import { Link } from 'react-router-dom';

import ArrowIcon from '../../../../assets/img/arrow.svg';

import { AppCardWrapper } from './components/app-card-wrapper';
import type { OcAppGalleryProps } from './types';

import './style.scss';

export const OcAppGallery: React.FC<OcAppGalleryProps> = (props) => {
	const {
		appGalleryTitle = '',
		seeAllUrl,
		moreAppsTitle = '',
		routerIcon,
		appGalleryDescription,
		appsArr = [],
		noAppMessage = '',
		customAppCardTemplate,
		routerLinkForOneApp,
		appNavigationParam,
		onAppClick,
	} = props;

	return (
		<div className="gallery">
			<div className="gallery__header">
				<div className="gallery_header-top">
					<h4 className="gallery__heading">{appGalleryTitle}</h4>
					{moreAppsTitle && seeAllUrl && (
						<Link to={seeAllUrl} className="gallery__more">
							<span className="gallery__more-text">{moreAppsTitle}</span>
							{routerIcon ? (
								<img src={routerIcon} alt="See all" />
							) : (
								<span className="gallery__more-icon">
									<ArrowIcon />
								</span>
							)}
						</Link>
					)}
				</div>
				<p className="gallery__description">{appGalleryDescription}</p>
			</div>
			{appsArr.length === 0 ? (
				<div className="gallery__no-content">
					<h5 className="gallery__no-content-text">{noAppMessage}</h5>
				</div>
			) : (
				<div className="gallery__content">
					{appsArr.map((app) => (
						<AppCardWrapper
							key={app.appId}
							app={app}
							onAppClick={onAppClick}
							customAppCardTemplate={customAppCardTemplate}
							routerLinkForOneApp={routerLinkForOneApp}
							appNavigationParam={appNavigationParam}
						/>
					))}
				</div>
			)}
		</div>
	);
};
