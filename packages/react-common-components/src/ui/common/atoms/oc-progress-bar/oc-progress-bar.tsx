import * as React from 'react';
import { initProgressBar } from '@openchannel/react-common-services/src/interceptors/progress-bar';
import './style.scss';

export interface ProgressBarProps {
	children: React.ReactElement;
}

export const OcProgressBar: React.FC<ProgressBarProps> = (props) => {
	const { children } = props;
	React.useEffect(() => initProgressBar(), []);
	return children;
};

export default OcProgressBar;
