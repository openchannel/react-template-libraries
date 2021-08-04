import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { InviteModalProps } from '../../../packages/react-common-components/src/ui/common';
import { useModalState } from '../../../packages/react-common-components/src/lib/hooks';
import OcButtonComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-button';
import OcInviteModal from '../../../packages/react-common-components/src/ui/common/organisms/oc-invite-modal';

export default {
	title: 'Invite User modal [BEM]',
	component: OcInviteModal,
} as Meta;

const ModalComponent: Story<InviteModalProps> = (args, { name }) => {
	const { isOpened, closeModal, openModal } = useModalState();

	return (
		<div>
			<OcButtonComponent style={{ width: 300 }} onClick={openModal}>
				Open {name} modal
			</OcButtonComponent>
			<OcInviteModal
				{...args}
				isOpened={isOpened}
				onClose={closeModal}
				onCancel={closeModal}
				onSubmit={closeModal}
			/>
		</div>
	);
};

export const Modal = ModalComponent.bind({});

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
	buttonPosition: 'between',
};
