//commit 77c7c788ebd91651e6edbb765e0501d609a55bf0 Author: Julia Date: 05.05.21, 19:28
import * as React from 'react';
import { Link } from 'react-router-dom';
import { stripHtmlTags } from '../../../../lib/index';
import { OcRatingComponent } from '../../../market/atoms/oc-rating';
import { parsePrice } from '../../../market/index';

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
		<Link className="oc-card" to={appRedirectLink}>
			<div className="oc-card__icon">
				<img className="img-fluid" src={appIcon} alt="" />
			</div>
			<div className="oc-card__content">
				<p className="oc-card__content-name">{app?.name || 'Default App'}</p>
				<div className="oc-card__content-info">
					<p className="oc-card__content-price">{parsePrice(app?.model[0])}</p>
					<OcRatingComponent
						rating={app?.rating || 0}
						reviewCount={app?.reviewCount || 0}
						type="single-star"
					/>
				</div>
				<p className="oc-card__content-summary">
					{app && app.summary ? stripHtmlTags(app.summary) : stripHtmlTags(app.description)}
				</p>
			</div>
		</Link>
	);
};
