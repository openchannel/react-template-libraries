import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { useModalState } from '../../../src/lib';
import { OcButtonComponent } from '../../../src/ui/common';
import { OcInviteModal, InviteModalProps } from '../../../src/ui/common';

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
		requestFindUserRoles: [],
		requestSendInvite: [],
	},
};
