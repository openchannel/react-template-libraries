import * as React from 'react';

export interface BaseToggleIndicatorProps {
	isOpened: boolean;
	defaultPlaceholderIcon?: JSX.Element;
	activePlaceholderIcon?: JSX.Element;
}

export type ToggleIndicatorProps = Omit<BaseToggleIndicatorProps, 'isOpened'>;

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
