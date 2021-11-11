//commit 77c7c788ebd91651e6edbb765e0501d609a55bf0 Author: Julia Date: 05.05.21, 19:30
import * as React from 'react';
import { Link } from 'react-router-dom';

import { stripHtmlTags } from '../../../../lib';
import { FullAppData } from '../../models';

import './style.scss';

export interface FeaturedAppsProps {
	/** List of featured apps */
	data: FullAppData[];
	/** Title of featured apps */
	label?: string;
	/** Message that'll be shown when no featured apps */
	emptyDataMessage?: string;
	/** list of classes that will be added to default class list  */
	customClass: string;
	/** Router link for each app card. Will end with chosen navigation parameter */
	mainRouterLink: string;
	/** custom card template in format of JSON string */
	customFeaturedAppCardTemplate?: string;
}

export const OcFeaturedAppsComponent: React.FC<FeaturedAppsProps> = (props) => {
	const {
		label = 'Featured',
		data,
		emptyDataMessage = 'No Featured Apps',
		customClass = '',
		mainRouterLink,
		customFeaturedAppCardTemplate = '',
	} = props;

	return (
		<div className="featured-apps">
			<div className="featured-apps__heading">
				<h4 className="featured-apps__heading-text">{label}</h4>
			</div>
			{data && data.length ? (
				<div className="featured-apps__container">
					{data.map((card, index) => (
						<div className="featured-apps__card-wrapper" key={label + index}>
							<div className="featured-apps__card">
								{!customFeaturedAppCardTemplate ? (
									<Link to={mainRouterLink} className={`featured-apps__card-body ${customClass}`}>
										<div className="featured-apps__card-img">
											<img src={card.customData.icon} alt="card-icon" />
										</div>
										<h5 className="featured-apps__card-name">{card.name}</h5>
										<span className="featured-apps__card-description">
											{card && card.summary
												? stripHtmlTags(card.customData.summary)
												: stripHtmlTags(card.customData.description)}
										</span>
									</Link>
								) : (
									{ customFeaturedAppCardTemplate }
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<h5>{emptyDataMessage}</h5>
			)}
		</div>
	);
};

export default OcFeaturedAppsComponent;
