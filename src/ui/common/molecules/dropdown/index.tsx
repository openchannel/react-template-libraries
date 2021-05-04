//commit 7fd920b5faa085508afb5d92eee0de9406562204 Author: Julia Date: 03.03.21, 15:53
//commit bec0e93ae5fdf6643bc6626143c1b701939af3da Author: Julia Date: 03.03.21, 18:01
import * as React from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import { SelectCallback } from 'react-bootstrap/helpers';

import { Toggle } from './toggle';
import { ListItem } from './listItem';
import { ListWrapper } from './listWrapper';


const INLINE_VARIANT = 'inline';
const BLOCK_VARIANT = 'block';

export type DropdownVariants = typeof INLINE_VARIANT | typeof BLOCK_VARIANT;

type Option = {
	label: string,
	value: string,
};

export interface DropdownProps {
	/**
	 * Dropdown type. Can be 'block' or 'inline'.
	 * @default inline
	 */
	type?: DropdownVariants;
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
	 *
	 */
	minDropdownWidth?: number;
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
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
	const {
		type = INLINE_VARIANT,
		title,
		options = [],
		selected,
		onSelect,
		minDropdownWidth,
		children,
	} = props

	React.useLayoutEffect(() => {
		if (type === INLINE_VARIANT) {
			import('./inlineStyles.scss')
		} else {
			import('./blockStyles.scss')
		}
	}, [])

	const onSelectItem = React.useCallback((eventKey: string, event: React.SyntheticEvent) => {
		const value = options.find(item => item.label === eventKey)

		onSelect(value, event)
	}, [onSelect, options]) as SelectCallback

	const mainClassByType = type === INLINE_VARIANT ? 'dropdown-label' : 'dropdown-button'
	const listProps = type === INLINE_VARIANT ? { alignRight: true } : {}
	const styleProps = minDropdownWidth ? { minWidth: minDropdownWidth } : {}

	return (
		<BootstrapDropdown className={mainClassByType} style={styleProps}>
			<BootstrapDropdown.Toggle as={Toggle} type={type}>
				{children || `${title} ${selected && selected.label}`}
			</BootstrapDropdown.Toggle>
			<BootstrapDropdown.Menu as={ListWrapper} type={type} style={styleProps} {...listProps}>
				{
					options.map((item) => {
						return (
							<BootstrapDropdown.Item
								key={item.label}
								eventKey={item.label}
								as={ListItem}
								onSelect={onSelectItem}
								type={type}
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
