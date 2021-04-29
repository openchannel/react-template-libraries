import * as React from 'react';

import { Modal, ModalProps } from '../modal';
import { Button, ButtonVariants } from '../../atoms';
import CloseIconSvg  from '../../../../assets/img/close-icon.svg';
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
		onCancel,
		onSubmit,
		modalTitle,
		modalText,
		confirmButtonText = 'Ok',
		confirmButtonType = 'primary',
		confirmButtonHide = false,
		rejectButtonText = 'No, cancel',
		rejectButtonType = 'secondary',
		rejectButtonHide = false,
	} = props

	return (
		<Modal
			isOpened={isOpened}
			onClose={onClose}
			className="confirmation-modal"
		>
			<div className="confirmation-modal__header">
				<h2 className="confirmation-modal__header-heading">{modalTitle}</h2>
				<CloseIconSvg
					tabIndex={isOpened ? 0 : -1}
					role="button"
					aria-label="close button"
					className="confirmation-modal__header-close-icon"
					onClick={onClose}
				/>
			</div>
			<div className="confirmation-modal__modal-body">
				<span className="confirmation-modal__text">{modalText}</span>
				<div className="confirmation-modal__button-container">
					{
						!rejectButtonHide && (
							<Button
								type={rejectButtonType}
								text={rejectButtonText}
								onClick={onCancel || onClose}
								customClass="confirmation-modal__button"
							/>
						)
					}
					{
						!confirmButtonHide && (
							<Button
								type={confirmButtonType}
								text={confirmButtonText}
								onClick={onSubmit || onClose}
								customClass="confirmation-modal__button"
							/>
						)
					}
				</div>
			</div>
		</Modal>
	)
}
