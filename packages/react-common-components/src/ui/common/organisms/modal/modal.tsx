import * as React from 'react';
import BootstrapModal, { ModalProps as BootstrapModalProps } from 'react-bootstrap/Modal';

import './style.scss';

export type ExtendedModalSizeVariants = BootstrapModalProps['size'] | 'md';

export interface ModalProps {
	/**
	 * Render a large, extra large or small modal. When not provided, the modal is rendered with medium (default) size.
	 * @default 'md'
	 */
	size?: ExtendedModalSizeVariants;

	/**
	 * When true The modal will show itself.
	 * @default false
	 */
	isOpened: boolean;

	/**
	 * A callback fired when the header closeButton or non-static backdrop is clicked.
	 */
	onClose: () => void;

	/**
	 * Add an optional extra class name to .modal-content
	 */
	className?: string;

	/**
	 * Modal content.
	 */
	children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
	const { size = 'md', isOpened, onClose, className = '', children } = props;

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
	);
};

export default Modal;
