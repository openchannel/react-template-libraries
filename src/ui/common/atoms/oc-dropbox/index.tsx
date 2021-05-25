import * as React from 'react';
import Select, {
	GroupTypeBase,
	InputActionMeta,
	OptionsType,
	OptionTypeBase,
	Props as SelectProps,
} from 'react-select';

import { transformToValidOptions } from './utils';

import './style.scss';

export type DropboxValue = string;

export interface DropboxProps extends SelectProps<GroupTypeBase<OptionsType<OptionTypeBase>>> {
	/**
	 * Placeholder (optional) - show text inside dropbox
	 */
	placeholder?: string;
	/**
	 * Items - items for selecting
	 */
	items: Array<DropboxValue>;
	/**
	 * Set disabled state for input (optional)
	 */
	disabled?: boolean;
	/**
	 * Selected item
	 */
	selectedItem: DropboxValue;
	/**
	 * onChange function
	 */
	selectItem: (item: DropboxValue) => void;
	/**
	 * Additional class to be assigned to the root element
	 */
	className?: string;
	/** The value of the search input */
	inputValue?: string | undefined;
	/** Handle change events on the input */
	onInputChange?: ((newValue: string, actionMeta: InputActionMeta) => void) | undefined;
	/** Handle key down events on the select */
	onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void;
}

export const OcDropboxComponent: React.FC<DropboxProps> = (props) => {
	const {
		items,
		selectedItem,
		selectItem,
		className = '',
		placeholder,
		disabled,
		inputValue,
		onInputChange,
		onKeyDown,
	} = props;

	const options = transformToValidOptions(items);

	const handleSelect = React.useCallback(
		(item: OptionTypeBase | null) => {
			selectItem(item ? item.value : null);
		},
		[selectItem],
	);

	return (
		<Select
			className={`oc-dropbox ${className}`}
			classNamePrefix="oc-dropbox"
			placeholder={placeholder}
			options={options}
			disabled={disabled}
			value={!selectedItem ? null : { label: selectedItem, value: selectedItem }}
			onChange={handleSelect}
			inputValue={inputValue}
			onInputChange={onInputChange}
			onKeyDown={onKeyDown}
			noOptionsMessage={() => null}
			isSearchable
		/>
	);
};
