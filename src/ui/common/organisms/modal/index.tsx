import * as React from 'react';
import BootstrapModal, { ModalProps as BootstrapModalProps } from 'react-bootstrap/Modal';


type ExtendedModalSizeVariants = Pick<BootstrapModalProps, 'size'> | 'md';

export interface ModalProps {
	/**
	 * @default 'md'
	 */
	size?: ExtendedModalSizeVariants;
	isOpened: boolean;
	onClose: () => void;
	className?: string;
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
	const {
		size = 'md',
		isOpened,
		onClose,
		className = '',
		children,
	} = props

	return (
		<BootstrapModal
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			size={size}
			show={isOpened}
			onHide={onClose}
			contentClassName={className}
		>
			{children}
		</BootstrapModal>
	)
}
