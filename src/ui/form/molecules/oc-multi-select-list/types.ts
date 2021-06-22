import React from 'react';

export interface OcMultiSelectListProps {
	name?: string;
	/**
	 * Label of the component.
	 */
	label?: string;
	/**
	 * List of available items to choose in dropbox.
	 */
	availableItemsList: string[];
	/**
	 * List of selected items.
	 */
	value: string[];
	onChange: (v: string[]) => void;
	/**
	 * List of items for automatically adding to the user tags list.
	 */
	defaultItems?: string[];

	onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}
