import * as React from 'react';
// import { useCallback, useState } from 'react';

interface useModalStateProps {
	isOpened: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useModalState = (): useModalStateProps => {
	const [isOpened, setOpened] = React.useState(false);

	const openModal = React.useCallback(() => setOpened(true), []);
	const closeModal = React.useCallback(() => setOpened(false), []);

	return {
		isOpened,
		openModal,
		closeModal,
	};
};
