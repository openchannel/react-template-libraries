//commit 7fd920b5faa085508afb5d92eee0de9406562204 Author: Julia Date: 03.03.21, 15:53
//commit bec0e93ae5fdf6643bc6626143c1b701939af3da Author: Julia Date: 03.03.21, 18:01
import * as React from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import { SelectCallback } from 'react-bootstrap/helpers';

import { Toggle } from './common/toggle';
import { ListItem } from './common/list-item';
import { ListWrapper } from './common/list-wrapper';
import { ToggleIndicator, ToggleIndicatorProps } from './common/toggle-indicator';


const INLINE_VARIANT = 'inline';
const BLOCK_VARIANT = 'block';

export type DropdownVariants = typeof INLINE_VARIANT | typeof BLOCK_VARIANT;

export type MinDropdownWidth = number | string;

type Option = {
	label: string,
	[key: string]: any,
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
	 * Custom template to display inside a toggle component
	 */
	children?: React.ReactNode;
	/**
	 * Additional class to be assigned to the root element
	 */
	className?: string;
}

export const BaseDropdown: React.FC<BaseDropdownProps & ToggleIndicatorProps> = (props) => {
	const {
		variant = INLINE_VARIANT,
		title,
		options = [],
		selected,
		onSelect,
		minDropdownWidth,
		children,
		className = '',
		defaultPlaceholderIcon,
		activePlaceholderIcon,
	} = props

	const [isOpened, setIsOpened] = React.useState(false);

	const onSelectItem = React.useCallback((eventKey: string, event: React.SyntheticEvent) => {
		const value = options.find(item => item.label === eventKey)

		onSelect(value, event)
	}, [onSelect, options]) as SelectCallback

	const onToggleCallback = React.useCallback((isOpen: boolean) => {
		setIsOpened(isOpen)
	}, [])

	const rootClassName = variant === INLINE_VARIANT ? `dropdown-label ${className}` : `dropdown-button ${className}`
	const listProps = variant === INLINE_VARIANT ? { alignRight: true } : {}
	const styleProps = minDropdownWidth ? { minWidth: minDropdownWidth } : {}

	return (
		<BootstrapDropdown
			className={rootClassName}
			style={styleProps}
			onToggle={onToggleCallback}
		>
			<BootstrapDropdown.Toggle
				as={Toggle}
				variant={variant}
			>
				{children || `${title} ${selected && selected.label}`}
				<ToggleIndicator
					isOpened={isOpened}
					defaultPlaceholderIcon={defaultPlaceholderIcon}
					activePlaceholderIcon={activePlaceholderIcon}
				/>
			</BootstrapDropdown.Toggle>
			<BootstrapDropdown.Menu as={ListWrapper} variant={variant} style={styleProps} {...listProps}>
				{
					options.map((item) => {
						return (
							<BootstrapDropdown.Item
								key={item.label}
								eventKey={item.label}
								as={ListItem}
								onSelect={onSelectItem}
								variant={variant}
							>
								{item.label}
							</BootstrapDropdown.Item>
						)
					})
				}
			</BootstrapDropdown.Menu>
		</BootstrapDropdown>
	)
}
