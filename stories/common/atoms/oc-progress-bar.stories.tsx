import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import OcProgressBar from '../../../packages/react-common-components/src/ui/common/atoms/oc-progress-bar';
import OcButton from '../../../packages/react-common-components/src/ui/common/atoms/oc-button';
import { axiosInstance } from '@openchannel/react-common-services/src/lib/request';

export default {
	title: 'Progress Bar',
	component: OcProgressBar,
} as Meta;

const requestSend = () =>
	axiosInstance.get('http://localhost:6006/progress', {
		headers: {
			'Access-Control-Allow-Origin': '*',
			withCredentials: false,
			mode: 'no-cors',
		},
	});
const Progress: Story = () => {
	return (
		<OcProgressBar>
			<h1>Display of progress bar work</h1>
			<OcButton text="Send Request" onClick={requestSend} style={{ width: '100px' }} />
		</OcProgressBar>
	);
};

export const Default = Progress.bind({});

Default.parameters = {
	layout: 'fullscreen',
};
