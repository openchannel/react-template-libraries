//commit 201584ff00aa6b9f6cb2dba8016675732d681b87 Author: Julia Date: 08.11.21, 15:34
import * as React from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash-es';

import { stripHtmlTags } from '../../../../lib';
import { OcEllipsis } from '../../atoms/oc-ellipsis';

import { OcFeaturedAppsProps } from './types';

import './style.scss';

export const OcFeaturedAppsComponent: React.FC<OcFeaturedAppsProps> = (props) => {
	const {
		data,
		label = 'Featured',
		emptyDataMessage = 'No Featured Apps',
		customClass = '',
		mainRouterLink = '/details/',
		customFeaturedAppCardTemplate = '',
		navigationParam = '',
	} = props;

	return (
		<div className="featured-apps">
			<div className="featured-apps__heading">
				<h2 className="featured-apps__heading-text">{label}</h2>
			</div>
			{data && data.length ? (
				<div
					className={`featured-apps__container ${
						data.length < 4 ? 'featured-apps__container_justify-start' : ''
					}`}
				>
					{data.slice(0, 4).map((card, index) => (
						<div key={label + index} className="featured-apps__card-wrapper">
							{!customFeaturedAppCardTemplate ? (
								<Link
									to={`${mainRouterLink}${get(card, navigationParam)}`}
									className="featured-apps__card"
								>
									<div className={`featured-apps__card-body ${customClass}`}>
										<div className="featured-apps__card-img">
											{card.icon && <img src={card.icon} alt={card.name || 'card-icon'} />}
										</div>
										<OcEllipsis tag="h3" className="featured-apps__card-name">
											{card.name}
										</OcEllipsis>
										<OcEllipsis tag="span" className="featured-apps__card-description">
											{card && card.summary
												? stripHtmlTags(card.summary)
												: stripHtmlTags(card.description)}
										</OcEllipsis>
									</div>
								</Link>
							) : (
								customFeaturedAppCardTemplate
							)}
						</div>
					))}
				</div>
			) : (
				<h3>{emptyDataMessage}</h3>
			)}
		</div>
	);
};

export default OcFeaturedAppsComponent;
