import { EffectCallback, useCallback, useState } from 'react';

interface useModalStateProps {
	isOpened: boolean;
	openModal: EffectCallback;
	closeModal: EffectCallback;
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
