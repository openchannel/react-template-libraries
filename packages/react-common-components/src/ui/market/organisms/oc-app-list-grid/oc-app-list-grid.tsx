// commit b2c3cf4f7a7f73eb0cf9c874b5f3fe43ec0f84a5 Author: Julia Date: 18.06.21, 15:24
import * as React from 'react';

import { AppCardWrapper } from './components/app-card-wrapper';
import { OcAppListGridProps } from './types';

import './style.scss';

export const OcAppListGrid: React.FC<OcAppListGridProps> = (props) => {
	const {
		appList = [],
		baseLinkForOneApp,
		customAppCardTemplate,
		noAppMessage = '',
		appNavigationParam = '',
		onAppClick,
	} = props;

	if (!appList || appList.length === 0) {
		return (
			<div className="app-list">
				<div className="app-list_empty">
					<h5>{noAppMessage}</h5>
				</div>
			</div>
		);
	}

	return (
		<div className="app-list">
			{appList.map((app) => (
				<AppCardWrapper
					key={app.appId}
					app={app}
					onAppClick={onAppClick}
					baseLinkForOneApp={baseLinkForOneApp}
					appNavigationParam={appNavigationParam}
					customAppCardTemplate={customAppCardTemplate}
				/>
			))}
		</div>
	);
};

export default OcAppListGrid;
