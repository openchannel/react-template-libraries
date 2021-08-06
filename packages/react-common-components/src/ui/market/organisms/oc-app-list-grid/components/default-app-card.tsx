import * as React from 'react';

import RightArrow from '../../../../../assets/img/right-arrow.svg';
import { isStorybook } from '../../../../../lib';
import OcRatingComponent from '../../../atoms/oc-rating';
import { parsePrice } from '../../../lib';

const standardAppIcon = isStorybook()
	? './img/standard-app-icon.svg'
	: '../../../../../assets/img/standard-app-icon.svg';

export const DefaultAppCard: React.FC<any> = (props) => {
	const { app } = props;

	return (
		<div className="app-list__card">
			<div className="app-list__card-wrapper">
				<div className="app-list__card-image">
					<img className="img-fluid" alt="" src={app.icon || standardAppIcon} />
				</div>
				<div className="app-list__card-data">
					<p className="app-list__card-name">{app.name}</p>
					<div className="app-list__card-info">
						<span className="app-list__card-price">{parsePrice(app.model[0])}</span>
						<OcRatingComponent rating={app.rating || 0} reviewCount={app.reviewCount} />
					</div>
				</div>
				<span className="app-list__card-arrow">
					<RightArrow />
				</span>
			</div>
		</div>
	);
};
