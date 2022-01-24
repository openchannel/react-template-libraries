import * as React from 'react';

import { ReactComponent as CloseIconSvg } from '../../../../assets/img/close-icon.svg';
import { OcSingleForm } from '../../../form';

import { OcInviteModalProps } from './types';

export const InviteUserContent: React.FC<Omit<OcInviteModalProps, 'isOpened' | 'size'>> = (
	props,
) => {
	const { onClose, onCancel, onSubmit, modalTitle, formConfig, successButtonText, buttonPosition } =
		props;

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
				<OcSingleForm
					formJsonData={formConfig}
					onCancel={onCancel || onClose}
					onSubmit={onSubmit}
					submitButtonText={successButtonText}
					buttonPosition={buttonPosition}
				/>
			</div>
		</>
	);
};
