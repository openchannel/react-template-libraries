import * as React from 'react';

import { ReactComponent as CloseIconSvg } from '../../../../assets/img/close-icon.svg';
import { OcForm } from '../../../form';

import { OcInviteModalProps } from './types';

export const InviteUserContent: React.FC<Omit<OcInviteModalProps, 'isOpened' | 'size'>> = (props) => {
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
					formJsonData={formConfig}
					onCancel={onCancel || onClose}
					onSubmit={onSubmit}
					successButtonText="Send invite"
					buttonPosition={buttonPosition}
				/>
			</div>
		</>
	);
};
