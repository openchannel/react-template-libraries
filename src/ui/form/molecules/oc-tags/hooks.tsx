import { useCallback, useState } from 'react';

import { UseTagDropboxState } from './types';

export const useTagDropboxState: UseTagDropboxState = ({ createTag }) => {
	const [inputValue, setInputValue] = useState('');

	const onInputChange = useCallback((inputValue, { action }) => {
		if (action === 'menu-close' || action === 'input-blur') {
			return;
		}
		setInputValue(inputValue);
	}, []);

	const resetInputValue = useCallback(() => {
		setInputValue('');
	}, []);

	const onKeyDown = useCallback(
		(event) => {
			if (!inputValue) return;

			switch (event.key) {
				case 'Enter':
				case 'Tab':
					createTag(inputValue);
					resetInputValue();
					// call blur to blur and close menu
					event.target.blur();
					event.preventDefault();
			}
		},
		[inputValue, createTag],
	);

	return {
		inputValue,
		resetInputValue,
		onInputChange,
		onKeyDown,
	};
};
