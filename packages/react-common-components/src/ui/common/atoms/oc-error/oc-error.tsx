import * as React from 'react';

import { OcErrorProps } from './types';

import './style.scss';

const OcError: React.FC<OcErrorProps> = (props) => {
	const { message } = props;

	if (!message) {
		return null;
	}

	return (
		<div className="error">
			{Array.isArray(message) ? (
				message.map((value) => (
					<span key={value} className="error__feedback">
						{value}
					</span>
				))
			) : (
				<span className="error__feedback">{message}</span>
			)}
		</div>
	);
};
export default OcError;
