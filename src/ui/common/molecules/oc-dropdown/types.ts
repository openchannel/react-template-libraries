import * as React from 'react';
import { DropdownMenuProps } from 'react-bootstrap/DropdownMenu';
import { DropdownToggleProps } from 'react-bootstrap/DropdownToggle';

import { BLOCK_VARIANT, INLINE_VARIANT } from './base-dropdown';

export type DropdownVariants = typeof INLINE_VARIANT | typeof BLOCK_VARIANT;

export interface BaseToggleIndicatorProps {
	isOpened: boolean;
	defaultPlaceholderIcon?: JSX.Element;
	activePlaceholderIcon?: JSX.Element;
}

export type ToggleIndicatorProps = Omit<BaseToggleIndicatorProps, 'isOpened'>;

export interface ToggleProps extends DropdownToggleProps {
	variant: DropdownVariants;
}

export interface ListWrapperProps {
	alignRight?: boolean;
	variant: DropdownVariants;
	style?: React.CSSProperties;
	className: string;
	children: React.ReactNode;
	'x-placement'?: string;
	'data-popper-escaped'?: boolean;
	'data-popper-placement'?: string;
	'data-popper-reference-hidden'?: boolean;
}

export interface ListItemProps {
	variant: DropdownVariants;
	className?: string;
	children: React.ReactNode;
	option: Option;
}

export type MinDropdownWidth = number | string;

type Option = {
	label: string;
	[key: string]: any;
};

export interface BaseDropdownProps {
	/**
	 * Dropdown variant. Can be 'block' or 'inline'.
	 * @default inline
	 */
	variant?: DropdownVariants;
	/**
	 * Array of the options. Example: [ { label: 'label', value: 'value' } ]
	 * @default []
	 */
	options: Option[];
	/**
	 * Prefix for selected value. Can be used only when children is not passed.
	 */
	title?: string;
	/**
	 * Minimal dropdown width in px or 'auto'.
	 */
	minDropdownWidth?: MinDropdownWidth;
	/**
	 * Selected item. { label: 'label', value: 'value' }
	 */
	selected?: Option;
	/**
	 * A callback fired when a menu item is clicked.
	 */
	onSelect: (v: Option | undefined, e: React.SyntheticEvent<unknown>) => void;
	/**
	 * Additional class to be assigned to the root element
	 */
	className?: string;
	/**
	 * Custom template to display inside a toggle component
	 */
	children?: React.ReactNode;
	/**
	 * ListItem component to render. Should be wrapped with forwardRef.
	 */
	listItem?: React.ForwardRefExoticComponent<any>;
	/**
	 * A set of props passed directly to dropdown-menu list.
	 */
	listProps?: { alignRight?: DropdownMenuProps['alignRight'] };
}

export type OcDropdownProps = Omit<BaseDropdownProps, 'variant' | 'minDropdownWidth' | 'children'> &
ToggleIndicatorProps;

export type OcDropdownButtonProps = Omit<BaseDropdownProps, 'variant' | 'title'> &
	ToggleIndicatorProps;
