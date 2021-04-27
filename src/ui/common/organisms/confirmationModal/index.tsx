import * as React from 'react';

import { Content } from './content';
import { Modal, ModalProps } from '../modal';
import { ButtonVariants } from '../../atoms';
import './styles.scss';


type ModalButtonVariants = Exclude<ButtonVariants, 'none'>;

export interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
	/**
	 * A callback fired when the rejectButton is clicked.
	 */
	onCancel?: (event: React.SyntheticEvent) => void;

	/**
	 * A callback fired when the confirmButton is clicked.
	 */
	onSubmit?: (event: React.SyntheticEvent) => void;

	/**
	 * The content of the modal title
	 */
	modalTitle: string;

	/**
	 * The content of the modal
	 */
	modalText: string;

	/**
	 * Button content
	 *
	 * @default Ok
	 */
	confirmButtonText?: string;

	/**
	 * The variant of the confirm button.
	 *
	 * @default 'primary'
	 */
	confirmButtonType?: ModalButtonVariants;

	/**
	 * Hide element when not needed
	 *
	 * @default false
	 */
	confirmButtonHide?: boolean;

	/**
	 *
	 *
	 * @default No, cancel
	 */
	rejectButtonText?: string;

	/**
	 * The variant of the confirm button.
	 *
	 * @default 'secondary'
	 */
	rejectButtonType?: ModalButtonVariants;

	/**
	 * Hide element when not needed
	 *
	 * @default false
	 */
	rejectButtonHide?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
	const {
		isOpened,
		onClose,
		...p
	} = props

	return (
		<Modal
			isOpened={isOpened}
			onClose={onClose}
			className="confirmation-modal"
		>
			<Content
				{...p}
				onClose={onClose}
			/>
		</Modal>
	)
}
