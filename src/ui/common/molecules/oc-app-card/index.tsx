//commit 77c7c788ebd91651e6edbb765e0501d609a55bf0 Author: Julia Date: 05.05.21, 19:28
import * as React from 'react';

import { getTextFromHtml, transformCurrency, truncateWithHTML } from '../../../../lib/utils';
import { OcRatingComponent } from '../../../market/atoms/oc-rating';

import { FullAppData } from './types';

import './style.scss';

export interface OcAppCardProps {
	/** source path for card icon*/
	appIcon?: string;
	/**
	 * One App to show. Must consists fields: 'name', 'model',
	 * 'rating', 'reviewCount', 'summary' or 'description'
	 */
	app?: FullAppData | any;
	/**
	 * Router link for the more apps navigation
	 */
	appRedirectLink: string;
}

export const OcAppCard: React.FC<OcAppCardProps> = (props) => {
	const {
		app,
		appIcon = '../../../../assets/img/standard-app-icon.svg',
		appRedirectLink = '/',
	} = props;

	return (
		<a className="oc-card" href={appRedirectLink}>
			<div className="oc-card__icon">
				<img className="img-fluid" src={appIcon} alt="" />
			</div>
			<div className="oc-card__content">
				<p className="oc-card__content-name">{app.name}</p>
				<div className="oc-card__content-info">
					<p className="oc-card__content-price">
						{transformCurrency(app.model[0]) || app.model[0].type}
					</p>
					<OcRatingComponent
						rating={app.rating || 0}
						reviewCount={app.reviewCount}
						type="single-star"
					/>
				</div>
				<p className="oc-card__content-summary">
					{app.summary
						? truncateWithHTML(getTextFromHtml(app.summary), 160)
						: truncateWithHTML(getTextFromHtml(app.description), 160)}
				</p>
			</div>
		</a>
	);
};
