import * as React from 'react';

import { TotalInfoProps } from '../types';

export const TotalInfo: React.FC<TotalInfoProps> = React.memo((props) => {
	const { count, countText, downloadUrl } = props;

	return (
		<div className="chart__data-container-total">
			<div className="chart__data-container-total-header">
				{downloadUrl && (
					<img src={downloadUrl} className="chart__data-container-total-image" alt="cloud" />
				)}
				<h5 className="chart__data-container-total-count">{count}</h5>
			</div>
			<span className="chart__data-container-total-text">{countText}</span>
		</div>
	);
});
