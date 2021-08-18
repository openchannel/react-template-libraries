import * as React from 'react';

import type { OcSocialLinksProps } from './types';

import './style.scss';

export const OcSocialLinks: React.FC<OcSocialLinksProps> = ({ links }) => {
	if (!links || links.length === 0) {
		return null;
	}

	return (
		<div className="social-links">
			{
				links.map(({ link, iconSrc, iconAlt }) => (
					<a
						key={link}
						className="social-links__item"
						href={link}
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							className="social-links__item-icon"
							src={iconSrc}
							alt={iconAlt || `${new URL(link).hostname} social-media` || 'social-media'}
						/>
					</a>
				))
			}
		</div>
	);
};
