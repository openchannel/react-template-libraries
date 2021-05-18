//commit 06a61466bd7e0307fd39a60ef51e8a8ef6b3eee8 Author: Pavel Date: 14.04.21, 14:34
import * as React from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';

import { Rating } from '../../atoms';
import { parsePrice } from './utils';
import { OcAppShortInfoProps } from './types';
import { stripHtmlTags, isStorybook } from '../../../../lib';
import './styles.scss';


const defaultAppIcon = isStorybook() ? './img/standard-app-icon.svg' : '../../../../assets/img/standard-app-icon.svg';

export const OcAppShortInfo: React.FC<OcAppShortInfoProps> = (props) => {
	const {
		app,
		clickByApp,
		customDropdown,
	} = props;

	const {
		name,
		model,
		rating,
		reviewCount,
		customData: {
			icon,
			summary,
			description,
		},
	} = app;

	const onNameClick = () => {
		clickByApp(app);
	};

	const appDescription = stripHtmlTags(summary ? summary : description);

	const appIcon = React.useMemo(() => {
		const url = sanitizeUrl(icon);

		return url !== 'about:blank' ? url : defaultAppIcon;
	}, [icon]);

	return (
		<div className="card-wrapper">
			<div className="info-card">
				<div className="info-card__logo">
					<img src={appIcon} alt={name} className="info-card__logo-image" />
				</div>
				<div className="info-card__content">
					<div className="info-card__content-wrapper">
						{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
						<p className="info-card__content-name" /*ellipsis*/ tabIndex={0} onClick={onNameClick}>{name}</p>
						<div className="info-card__dropdown info-card__dropdown_mobile">
							{customDropdown}
						</div>
					</div>
					<div className="info-card__content-data">
						<span className="info-card__content-price">{parsePrice(model[0])}</span>
						<Rating
							type="single-star"
							rating={Number(rating) * 0.01}
							reviewCount={reviewCount}
							className="info-card__content-rating"
						/>
					</div>
					<p
						className="info-card__content-summary"
						title={appDescription}
						// ellipsis
					>
						{appDescription}
					</p>
				</div>
			</div>
			<div className="info-card__dropdown info-card__dropdown_desktop">
				{customDropdown}
			</div>
		</div>
	)
}
