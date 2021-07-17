import * as React from 'react';

import CloseIconSvg from '../../../../assets/img/close-icon.svg';
import { OcForm } from '../../../form';

import { InviteModalProps } from './index';

export type InviteContentProps = Omit<InviteModalProps, 'size' | 'isOpened'>;

export const InviteUserContent: React.FC<InviteContentProps> = (props) => {
	const { onClose, onCancel, onSubmit, modalTitle, formConfig, buttonPosition } = props;

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
			<div className="invite-modal__modal-body">
				<OcForm
					formJsonData={formConfig!}
					onCancel={onCancel!}
					onSubmit={onSubmit!}
					successButtonText="Send invite"
					buttonPosition={buttonPosition}
				/>
			</div>
		</>
	);
};
