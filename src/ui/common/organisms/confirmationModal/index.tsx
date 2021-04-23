import * as React from 'react';

import { Modal, ModalProps } from '../modal';
import { Button, ButtonVariants } from '../../atoms';
import CloseIconSvg  from '../../../../assets/img/close-icon.svg';
import './styles.scss';


type ModalButtonVariants = Exclude<ButtonVariants, 'none'>;


export interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
	onCancel?: (event: React.SyntheticEvent) => void;
	onSubmit?: (event: React.SyntheticEvent) => void;
	/**
	 * Checks if the button should be disabled
	 */
	modalTitle: string;
	modalText: string;

	/**
	 * @default Ok
	 */
	confirmButtonText?: string;
	/**
	 * @default 'primary'
	 */
	confirmButtonType?: ModalButtonVariants;
	/**
	 * @default false
	 */
	confirmButtonHide?: boolean;

	/**
	 * @default No, cancel
	 */
	rejectButtonText?: string;
	/**
	 * @default 'secondary'
	 */
	rejectButtonType?: ModalButtonVariants;
	/**
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
