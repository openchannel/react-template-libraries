//commit 48ea5cbd79e7ab31781a2417c39a1059f9c22739 Author: Vitaliy Samofal Date: 29.03.21, 12:05
import * as React from 'react';

import Modal  from '../modal/modal';

import { InviteUserContent } from './content';
import { OcInviteModalProps } from './types';
import './style.scss';

export const OcInviteModal: React.FC<OcInviteModalProps> = (props) => {
	const { isOpened, onClose, size, ...p } = props;

	return (
		<Modal isOpened={isOpened} onClose={onClose} size={size} className="invite-modal">
			<InviteUserContent {...p} onClose={onClose} />
		</Modal>
	);
};

export default OcInviteModal;
