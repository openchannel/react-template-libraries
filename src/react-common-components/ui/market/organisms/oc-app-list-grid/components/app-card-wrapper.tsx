import * as React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

import { validateRouterLink } from '../../../lib';
import { AppCardWrapperProps } from '../types';

import { DefaultAppCard } from './default-app-card';

export const AppCardWrapper: React.FC<AppCardWrapperProps> = (props) => {
	const {
		app,
		baseLinkForOneApp,
		customAppCardTemplate,
		onAppClick,
		appNavigationParam = '',
	} = props;

	if (baseLinkForOneApp) {
		return (
			<div className="app-list__card-container">
				<Link
					to={validateRouterLink(baseLinkForOneApp).concat(get(app, appNavigationParam, ''))}
					className="app-list__card-container-link"
				>
					{customAppCardTemplate ? (
						React.cloneElement(customAppCardTemplate, { app })
					) : (
						<DefaultAppCard app={app} />
					)}
				</Link>
			</div>
		);
	}

	return (
		<div
			className="app-list__card-container"
			onClick={onAppClick ? () => onAppClick(app) : undefined}
			tabIndex={0}
			role="button"
		>
			{customAppCardTemplate ? (
				React.cloneElement(customAppCardTemplate, { app })
			) : (
				<DefaultAppCard app={app} />
			)}
		</div>
	);
};
