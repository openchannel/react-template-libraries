//commit 48ea5cbd79e7ab31781a2417c39a1059f9c22739 Author: Vitaliy Samofal Date: 29.03.21, 12:05
import * as React from 'react';

import { ButtonVariants } from '../../atoms';
import { Modal, ModalProps } from '../modal';

import { OcImageCropperModalContent } from './content';

import './style.scss';

type ModalButtonVariants = Exclude<ButtonVariants, 'none'>;

export interface CropperModalProps extends Omit<ModalProps, 'children'> {
	/** A callback fired when the rejectButton is clicked.*/
	onCancel?: (event: React.SyntheticEvent) => void;
	/** A callback fired when the confirmButton is clicked.*/
	onFiles?: (event: React.SyntheticEvent) => void;
	/** Button content*/
	confirmButtonText?: string;
	/** The variant of the confirm button.*/
	confirmButtonType?: ModalButtonVariants;
	/** Hide element when not needed*/
	confirmButtonHide?: boolean;
	/** Button content */
	rejectButtonText?: string;
	/** The variant of the confirm button. */
	rejectButtonType?: ModalButtonVariants;
	/** Hide element when not needed */
	rejectButtonHide?: boolean;
	image?: any;
	setCropData: any;
	cropData: any;
	files: any;
	cropFileName?: string;
}

export const OcCropperModalComponent: React.FC<CropperModalProps> = (props) => {
	const { isOpened, onClose, ...p } = props;

	return (
		<Modal isOpened={isOpened} onClose={onClose} /* className="" */>
			<OcImageCropperModalContent {...p} onClose={onClose} />
		</Modal>
	);
};
