import {ModalProps} from '../modal';
import * as React from 'react';
import {ButtonVariants} from '../../atoms';

export type CropperModalButtonVariants = Exclude<ButtonVariants, 'none'>;

export interface CropperModalData {
	filename: string,
	image: string,
}

export interface CropperModalProps extends Omit<ModalProps, 'children'> {
	/** A callback fired when the rejectButton is clicked.*/
	onCancel?: (event: React.SyntheticEvent) => void;
	/** A callback fired when the confirmButton is clicked.*/
	onImageCrop?: (image: File) => void;
	/** Button content*/
	confirmButtonText?: string;
	/** The variant of the confirm button.*/
	confirmButtonType?: CropperModalButtonVariants;
	/** Hide element when not needed*/
	confirmButtonHide?: boolean;
	/** Button content */
	rejectButtonText?: string;
	/** The variant of the confirm button. */
	rejectButtonType?: CropperModalButtonVariants;
	/** Hide element when not needed */
	rejectButtonHide?: boolean;

	cropData: CropperModalData;
}
