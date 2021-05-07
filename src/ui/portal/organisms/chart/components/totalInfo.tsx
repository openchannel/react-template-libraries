import * as React from 'react';


export interface TotalInfoProps {
	count: number;
	caption: string;
	imageSrc?: string;
}

export const TotalInfo: React.FC<TotalInfoProps> = React.memo((props) => {
	const {
		count,
		caption,
		imageSrc,
	} = props

	return (
		<div className="chart__data-container-total">
			<div className="chart__data-container-total-header">
				{imageSrc && <img src={imageSrc} className="chart__data-container-total-image" alt="cloud" />}
				<h5 className="chart__data-container-total-count">{count}</h5>
			</div>
			<span className="chart__data-container-total-text">{caption}</span>
		</div>
	)
})
