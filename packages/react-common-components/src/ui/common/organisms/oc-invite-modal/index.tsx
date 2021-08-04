//commit 48ea5cbd79e7ab31781a2417c39a1059f9c22739 Author: Vitaliy Samofal Date: 29.03.21, 12:05
import * as React from 'react';

import { ButtonVariants } from '../../atoms';
import { ModalProps } from '../modal';
import Modal from '../modal';

import { InviteUserContent } from './content';

import './style.scss';

type ModalButtonVariants = Exclude<ButtonVariants, 'none'>;

export interface InviteModalProps extends Omit<ModalProps, 'children'> {
	/** A callback fired when the rejectButton is clicked.*/
	onCancel?: any;
	/** A callback fired when the confirmButton is clicked.*/
	onSubmit?: any;
	/** The content of the modal title */
	modalTitle: string;
	/** The content of the modal */
	modalText?: string;
	/** Button content * @default Ok*/
	confirmButtonText?: string;
	/** The variant of the confirm button. @default 'primary'*/
	confirmButtonType?: ModalButtonVariants;
	/** Hide element when not needed @default false */
	confirmButtonHide?: boolean;
	/** Button content @default No, cancel */
	rejectButtonText?: string;
	/** The variant of the confirm button. @default 'secondary' */
	rejectButtonType?: ModalButtonVariants;
	/** Hide element when not needed @default false */
	rejectButtonHide?: boolean;
	// config for custom form generation
	formConfig?: any;
	/** Modal data */
	modalData?: any;
	/** buttons position on form */
	buttonPosition?: string;
}

const OcInviteModal: React.FC<InviteModalProps> = (props) => {
	const { isOpened, onClose, ...p } = props;

	return (
		<Modal isOpened={isOpened} onClose={onClose} className="invite-modal">
			<InviteUserContent {...p} onClose={onClose} />
		</Modal>
	);
};

export default OcInviteModal;
