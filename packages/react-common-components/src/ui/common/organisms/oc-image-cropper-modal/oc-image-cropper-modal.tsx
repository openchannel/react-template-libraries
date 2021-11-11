//commit 48ea5cbd79e7ab31781a2417c39a1059f9c22739 Author: Vitaliy Samofal Date: 29.03.21, 12:05
import * as React from 'react';
import Modal  from '../modal/modal';

import './style.scss';
import {CropperModalProps} from './types';
import {OcImageCropperModalContent} from './modal-content';

export const OcCropperModalComponent: React.FC<CropperModalProps> = (props) => {
	const {
		isOpened,
		onClose
	} = props;

	return (
		<Modal isOpened={isOpened} onClose={onClose}>
			<OcImageCropperModalContent {...props} />
		</Modal>
	);
};

export default OcCropperModalComponent;
