import * as React from 'react';

import { OcErrorProps } from './types';

import './style.scss';

export const OcError: React.FC<OcErrorProps> = (props) => {
	const { message } = props;

	if (!message) {
		return null;
	}

	return (
		<div className="error">
			{Array.isArray(message)
				? message.map((value) => <span className="error__feedback">{value}</span>)
				: message}
		</div>
	);
};
