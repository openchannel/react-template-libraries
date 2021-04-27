import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { useModalState } from '../../../src/lib';
import { Modal, ModalProps } from '../../../src/ui/common';


export default {
	title: 'Common/Organisms/Modal (base)',
	component: Modal,
} as Meta;


const ModalComponent: Story<ModalProps> = (args) => {
	const { isOpened, closeModal, openModal } = useModalState()

	return (
		<div>
			<button type="button" onClick={openModal}>Open modal</button>
			<Modal
				{...args}
				isOpened={isOpened}
				onClose={closeModal}
			>
				<div>
					some content
					<button type="button" onClick={closeModal}>close</button>
				</div>
			</Modal>
		</div>
	)
};

export const DefaultModal = ModalComponent.bind({});
DefaultModal.storyName = 'Modal';
