//commit 77c7c788ebd91651e6edbb765e0501d609a55bf0 Author: Julia Date: 05.05.21, 19:28
import * as React from 'react';

import { stripHtmlTags } from '../../../../lib';
import OcRatingComponent from '../../atoms/oc-rating';
import { parsePrice } from '../../lib';
import appIcon from '../../../../assets/img/standard-app-icon.svg';

import { OcAppCardWrapper } from './components/oc-app-card-wrapper';
import type { OcAppCardProps } from './types';

import './style.scss';

const OcAppCard: React.FC<OcAppCardProps> = (props) => {
	const { app, appRedirectLink } = props;

	return (
		<OcAppCardWrapper appRedirectLink={appRedirectLink}>
			<div className="oc-card__icon">
				<img src={app?.icon || appIcon} className="img-fluid" alt={app.name} />
			</div>
			<div className="oc-card__content">
				<p className="oc-card__content-name">{app.name}</p>
				<div className="oc-card__content-info">
					<p className="oc-card__content-price">{parsePrice(app?.model[0])}</p>
					<OcRatingComponent
						rating={app.rating || 0}
						reviewCount={app.reviewCount || 0}
						type="single-star"
					/>
				</div>
				<p className="oc-card__content-summary">
					{app.summary ? stripHtmlTags(app.summary) : stripHtmlTags(app.description)}
				</p>
			</div>
		</OcAppCardWrapper>
	);
};

export default OcAppCard;
