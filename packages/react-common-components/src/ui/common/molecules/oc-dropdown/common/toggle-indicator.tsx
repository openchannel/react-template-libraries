import * as React from 'react';

import { BaseToggleIndicatorProps } from '../types';

export const ToggleIndicator: React.FC<BaseToggleIndicatorProps> = (props): JSX.Element | null => {
	const { isOpened, defaultPlaceholderIcon, activePlaceholderIcon } = props;

	if (!defaultPlaceholderIcon) {
		return null;
	}

	if (!activePlaceholderIcon) {
		return defaultPlaceholderIcon;
	}

	if (isOpened) {
		return activePlaceholderIcon;
	}
	return defaultPlaceholderIcon;
};
