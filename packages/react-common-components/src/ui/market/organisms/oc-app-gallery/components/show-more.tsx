import * as React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../../../../../assets/img/arrow.svg';
import type { OcAppGalleryProps } from '../types';

const Icon = React.memo(({ routerIcon }: { routerIcon?: string }) => {
	if (routerIcon) return <img src={routerIcon} alt="See more" />;

	return (
		<span className="gallery__more-icon">
			<ArrowIcon />
		</span>
	);
});

export const ShowMore: React.FC<
	Pick<OcAppGalleryProps, 'seeAllUrl' | 'moreAppsTitle' | 'onClickMoreApps' | 'routerIcon'>
> = (props) => {
	const { seeAllUrl, moreAppsTitle = 'More', onClickMoreApps, routerIcon } = props;

	if (moreAppsTitle && !seeAllUrl) {
		return (
			<span
				role="button"
				tabIndex={0}
				onClick={onClickMoreApps}
				className="gallery__more"
				aria-label="See more apps"
			>
				<span className="gallery__more-text">{moreAppsTitle}</span>
				<Icon routerIcon={routerIcon} />
			</span>
		);
	}

	if (moreAppsTitle && seeAllUrl) {
		return (
			<Link to={seeAllUrl} className="gallery__more">
				<span className="gallery__more-text">{moreAppsTitle}</span>
				<Icon routerIcon={routerIcon} />
			</Link>
		);
	}

	return null;
};
