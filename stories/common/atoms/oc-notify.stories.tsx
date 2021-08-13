import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';
import {
	notify,
	OcNotificationContainer,
} from '../../../packages/react-common-components/src/ui/common/atoms/oc-notify';

export default {
	title: 'Toast Notifications',
	component: notify,
} as unknown as Meta;

const NotificationsComponent: Story<any> = () => {
	const handleClick = () => {
		notify.success('Success');
		notify.error('Error');
		notify.warning('Warning');
		notify.info('Info');
	};
	return (
		<div>
			<button onClick={handleClick}>Notify!</button>
			<OcNotificationContainer />
		</div>
	);
};

export const NotificationsStory = NotificationsComponent.bind({});
