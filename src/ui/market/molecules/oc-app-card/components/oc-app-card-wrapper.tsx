import * as React from 'react';
import { Link } from 'react-router-dom';

import { OcAppCardProps } from '../types';

export const OcAppCardWrapper: React.FC<Pick<OcAppCardProps, 'appRedirectLink'>> = (props) => {
	const { appRedirectLink, children } = props;

	if (appRedirectLink) {
		return (
			<Link className="oc-card" to={appRedirectLink}>
				{children}
			</Link>
		);
	}

	return <span className="oc-card">{children}</span>;
};
