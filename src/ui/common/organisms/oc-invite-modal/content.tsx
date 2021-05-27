import * as React from 'react';

import CloseIconSvg from '../../../../assets/img/close-icon.svg';
import { OcButtonComponent } from '../../atoms';

import { InviteModalProps } from './index';

export type InviteContentProps = Omit<InviteModalProps, 'size' | 'isOpened'>;

export const InviteUserContent: React.FC<InviteContentProps> = (props) => {
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
	} = props;

	return (
		<>
			<div className="invite-modal__header header">
				<h2 className="invite-modal__header-heading">{modalTitle}</h2>
				<CloseIconSvg
					role="button"
					aria-label="close button"
					className="invite-modal__header-close-icon"
					onClick={onClose}
				/>
			</div>
			<div className="invite-modal__modal-body"></div>
		</>
	);
};
