import * as React from 'react';
import { initProgressBar } from '@openchannel/react-common-services/src/interceptors/progress-bar';
import './style.scss';
// import { axiosInstance } from '@openchannel/react-common-services/src/lib/request';

export interface ProgressBarProps {
	children: React.ReactNode | React.ReactElement;
}

export const OcProgressBar: React.FC<ProgressBarProps> = (props) => {
	const { children } = props;
	return initProgressBar(), (<>{children}</>);
};

export default OcProgressBar;
