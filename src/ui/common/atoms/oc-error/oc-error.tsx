import * as React from 'react';

import { OcErrorProps } from './types';
import './styles.scss';


export const OcError: React.FC<OcErrorProps> = (props) => {
	const { error } = props;

	if (!error) {
		return null;
	}

	return (
		<div className="error">
			<span className="error__feedback">{error}</span>
		</div>
	)
}
