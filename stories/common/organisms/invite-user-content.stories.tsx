import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	InviteUserContent,
} from '../../../packages/react-common-components/src/ui/common/organisms/oc-invite-modal/content';
import { OcInviteModalProps } from '../../../packages/react-common-components/src/ui/common';

export default {
	title: 'Invite user modal content [BEM]',
	component: InviteUserContent,
} as Meta;

const Component: Story<Omit<OcInviteModalProps, 'isOpened' | 'size'>> = (args) => {
	return (
		<div className="invite-modal">
			<InviteUserContent {...args} />
		</div>
	);
};

export const Modal = Component.bind({});
Modal.args = {
	modalTitle: 'Invite a member',
	successButtonText: 'Send invite',
	formConfig: {
		fields: [
			{
				id: 'name',
				label: 'Name',
				description: '',
				placeholder: 'Enter Name',
				defaultValue: null,
				type: 'text',
				required: null,
				attributes: {
					required: true,
				},
				options: null,
			},
			{
				id: 'email',
				label: 'Email',
				description: '',
				placeholder: 'Email',
				defaultValue: null,
				type: 'emailAddress',
				required: null,
				attributes: {
					maxChars: null,
					required: true,
					minChars: null,
				},
				options: null,
			},
			{
				id: 'roles',
				label: 'Select role',
				description: '',
				defaultValue: '',
				type: 'dropdownList',
				required: true,
				attributes: { required: true },
				options: [],
			},
		],
	},
	buttonPosition: 'between',
};
