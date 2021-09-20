import * as React from 'react';

interface ProgressBarProps {
	className?: string;
	value?: number;
	max?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
	const { className, value = 0, max = 100 } = props;

	return (
		<div className={className} style={{ width: '100%' }}>
			<div style={{ width: `${(value / max) * 100}%` }}></div>
		</div>
	);
};

export default ProgressBar;
