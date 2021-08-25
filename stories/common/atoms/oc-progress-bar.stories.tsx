import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import OcProgressBar from '../../../packages/react-common-components/src/ui/common/atoms/oc-progress-bar';
import OcButton from '../../../packages/react-common-components/src/ui/common/atoms/oc-button';
import { axiosInstance } from '@openchannel/react-common-services/src/lib/request';

export default {
	title: 'Progress Bar',
	component: OcProgressBar,
} as Meta;

const getGoogle = () => axiosInstance.get('https://google.com/');
const requestSend = () => {
	getGoogle();
	getGoogle();
	setTimeout(getGoogle, 2000);
	setTimeout(getGoogle, 5000);
	setTimeout(getGoogle, 8000);
};
const Progress: Story = (args) => {
	return <OcProgressBar children={args.children} />;
};

export const Default = Progress.bind({});

Default.parameters = {
	layout: 'fullscreen',
};

Default.args = {
	children: (
		<>
			<h1>Display of progress bar work</h1>
			<OcButton text="Send Request" onClick={requestSend} style={{ width: '100px' }} />
		</>
	),
};
