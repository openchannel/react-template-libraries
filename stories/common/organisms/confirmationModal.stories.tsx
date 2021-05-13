import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { useModalState } from '../../../src/lib';

import { ConfirmationModal, ConfirmationModalProps } from '../../../src/ui/common';


export default {
	title: 'Common/Organisms/Confirmation modal [BEM]',
	component: ConfirmationModal,
} as Meta;


const ModalComponent: Story<ConfirmationModalProps> = (args, { name }) => {
	const { isOpened, closeModal, openModal } = useModalState()

	return (
		<div>
			<button type="button" onClick={openModal}>Open {name} modal</button>
			<ConfirmationModal
				{...args}
				isOpened={isOpened}
				onClose={closeModal}
				onCancel={closeModal}
				onSubmit={closeModal}
			/>
		</div>
	)
};

export const DefaultConfirmation = ModalComponent.bind({});
DefaultConfirmation.args = {
	modalTitle: 'Submit app',
	modalText: 'Submit this app to the marketplace now?',
	confirmButtonText: 'Yes, submit it',
};
DefaultConfirmation.storyName = 'Default confirmation';

export const WarningConfirmation = ModalComponent.bind({});
WarningConfirmation.args = {
	modalTitle: 'Delete app',
	modalText: 'Delete this app from the marketplace now?',
	confirmButtonText: 'Yes, delete it',
	confirmButtonType: 'danger'
};
WarningConfirmation.storyName = 'Warning confirmation';
