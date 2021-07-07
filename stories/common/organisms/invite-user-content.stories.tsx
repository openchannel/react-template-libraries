import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	InviteUserContent,
	InviteContentProps,
} from '../../../src/react-common-components/ui/common/organisms/oc-invite-modal/content';

export default {
	title: 'Invite user modal content [BEM]',
	component: InviteUserContent,
} as Meta;

const Component: Story<InviteContentProps> = (args) => {
	return (
		<div className="invite-modal">
			<InviteUserContent {...args} />
		</div>
	);
};

export const Modal = Component.bind({});
Modal.args = {
	modalData: {
		modalTitle: 'Invite a member',
		successButtonText: 'Send invite',
	},
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
					maxChars: null,
					required: true,
					minChars: null,
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
	modalTitle: 'Invite a member',
	buttonPosition: 'between',
};
