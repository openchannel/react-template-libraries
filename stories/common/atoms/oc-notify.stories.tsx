import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import {
	notify,
	OcButtonComponent,
	OcNotificationContainer,
} from '../../../packages/react-common-components/src/ui/common';

export const Notifications: Story = () => (
	<div style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
		<OcNotificationContainer />

		<OcButtonComponent onClick={() => notify.success('Success')}>Notify Success</OcButtonComponent>
		<br />
		<OcButtonComponent onClick={() => notify.error('Error')}>Notify Error</OcButtonComponent>
		<br />
		<OcButtonComponent onClick={() => notify.warning('Warning')}>Notify Warning</OcButtonComponent>
		<br />
		<OcButtonComponent onClick={() => notify.info('Info')}>Notify Info</OcButtonComponent>
	</div>
);

export default {
	title: 'Toast Notifications',
	component: Notifications,
} as Meta;
