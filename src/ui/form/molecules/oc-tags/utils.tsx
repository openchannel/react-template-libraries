import { useCallback, useState } from 'react';
import { OcTagsValue } from './types';

import { NormalizeTags, UseCreatableState } from './types';


export const normalizeTags: NormalizeTags = (array, type) => {
	return array.map(item => {
		switch (type) {
			case 'number': {
				return isNaN(Number(item)) ? item : Number(item);
			}
			case 'boolean': {
				try {
					return JSON.parse(item);
				} catch {
					return item.trim();
				}
			}
			default: return item.trim();
		}
	});
}

export const useCreatableState: UseCreatableState = ({ createTag }) => {
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

	const onKeyDown = useCallback((event) => {
		if (!inputValue) return;

		switch (event.key) {
			case 'Enter':
			case 'Tab':
				createTag(inputValue);
				resetInputValue();
				event.preventDefault();
		}
	}, [inputValue, createTag]);

	return {
		inputValue,
		resetInputValue,
		onInputChange,
		onKeyDown,
	};
}
