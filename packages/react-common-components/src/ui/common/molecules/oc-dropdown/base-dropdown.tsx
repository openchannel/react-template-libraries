//commit 7fd920b5faa085508afb5d92eee0de9406562204 Author: Julia Date: 03.03.21, 15:53
//commit bec0e93ae5fdf6643bc6626143c1b701939af3da Author: Julia Date: 03.03.21, 18:01
import * as React from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';
import { SelectCallback } from 'react-bootstrap/helpers';

import { ListItem as DefaultListItem } from './common/list-item';
import { ListWrapper } from './common/list-wrapper';
import { Toggle } from './common/toggle';
import { ToggleIndicator } from './common/toggle-indicator';
import { BaseDropdownProps, ToggleIndicatorProps } from './types';

export const INLINE_VARIANT = 'inline';
export const BLOCK_VARIANT = 'block';

export const BaseDropdown: React.FC<BaseDropdownProps & ToggleIndicatorProps> = (props) => {
	const {
		variant = INLINE_VARIANT,
		title,
		options = [],
		selected,
		onSelect,
		minDropdownWidth,
		className = '',
		children,
		listItem,
		listProps = {},
		defaultPlaceholderIcon,
		activePlaceholderIcon,
	} = props;

	const [isOpened, setIsOpened] = React.useState(false);

	const onSelectItem = React.useCallback(
		(eventKey: string, event: React.SyntheticEvent) => {
			const value = options.find((item) => item.label === eventKey);

			onSelect(value, event);
		},
		[onSelect, options],
	) as SelectCallback;

	const onToggleCallback = React.useCallback((isOpen: boolean) => {
		setIsOpened(isOpen);
	}, []);

	const rootClassName =
		variant === INLINE_VARIANT ? `dropdown-label ${className}` : `dropdown-button ${className}`;
	const styleProps = minDropdownWidth ? { minWidth: minDropdownWidth } : {};
	const mergedListProps =
		variant === INLINE_VARIANT ? { alignRight: true, ...listProps } : { ...listProps };

	return (
		<BootstrapDropdown className={rootClassName} style={styleProps} onToggle={onToggleCallback}>
			<BootstrapDropdown.Toggle as={Toggle} variant={variant}>
				{children || `${title} ${selected && selected.label}`}
				<ToggleIndicator
					isOpened={isOpened}
					defaultPlaceholderIcon={defaultPlaceholderIcon}
					activePlaceholderIcon={activePlaceholderIcon}
				/>
			</BootstrapDropdown.Toggle>
			<BootstrapDropdown.Menu
				as={ListWrapper}
				variant={variant}
				style={styleProps}
				{...mergedListProps}
			>
				{options.map((option) => (
					<BootstrapDropdown.Item
						key={option.label}
						eventKey={option.label}
						option={option}
						as={listItem || DefaultListItem}
						onSelect={onSelectItem}
						variant={variant}
					>
						{option.label}
					</BootstrapDropdown.Item>
				))}
			</BootstrapDropdown.Menu>
		</BootstrapDropdown>
	);
};
