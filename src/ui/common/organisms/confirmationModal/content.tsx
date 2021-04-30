import * as React from 'react';

import { ConfirmationModalProps } from './index';
import { Button } from '../../atoms';
import CloseIconSvg  from '../../../../assets/img/close-icon.svg';


export type ContentProps = Omit<ConfirmationModalProps, 'size' | 'isOpened'>

export const Content: React.FC<ContentProps> = (props) => {
	const {
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
		<>
			<div className="confirmation-modal__header">
				<h2 className="confirmation-modal__header-heading">{modalTitle}</h2>
				<CloseIconSvg
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
		</>
	)
}
