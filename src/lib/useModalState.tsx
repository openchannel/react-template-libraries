import { useCallback, useState } from 'react';

interface useModalStateProps {
	isOpened: boolean;
	openModal: () => void;
	closeModal: () => void;
}

export const useModalState = (): useModalStateProps => {
	const [isOpened, setOpened] = useState(false);

	const openModal = useCallback(() => setOpened(true), []);
	const closeModal = useCallback(() => setOpened(false), []);

	return {
		isOpened,
		openModal,
		closeModal,
	};
};
