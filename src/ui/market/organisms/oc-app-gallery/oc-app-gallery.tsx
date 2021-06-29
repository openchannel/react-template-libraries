// commit 18f8662efb2ed47b717100d10f41f6f716291fe9 Author: Julia Date: 28.05.21, 17:55
import * as React from 'react';

import { AppCardWrapper } from './components/app-card-wrapper';
import { ShowMore } from './components/show-more';
import type { OcAppGalleryProps } from './types';

import './style.scss';

export const OcAppGallery: React.FC<OcAppGalleryProps> = (props) => {
	const {
		appGalleryTitle = '',
		seeAllUrl,
		moreAppsTitle = 'More',
		onClickMoreApps,
		routerIcon,
		appGalleryDescription,
		appsArr = [],
		noAppMessage = '',
		customAppCardTemplate,
		routerLinkForOneApp,
		appNavigationParam = 'appId',
		onAppClick,
	} = props;

	return (
		<div className="gallery">
			<div className="gallery__header">
				<div className="gallery__header-top">
					<h4 className="gallery__heading">{appGalleryTitle}</h4>
					<ShowMore
						seeAllUrl={seeAllUrl}
						moreAppsTitle={moreAppsTitle}
						onClickMoreApps={onClickMoreApps}
						routerIcon={routerIcon}
					/>
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
