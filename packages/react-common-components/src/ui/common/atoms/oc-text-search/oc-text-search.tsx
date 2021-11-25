//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { noop } from 'lodash';

import { ReactComponent as TextSearchIcon } from '../../../../assets/img/text-search-icon.svg';
import OcButtonComponent from '../oc-button/oc-button';
import OcTagElement from '../oc-tag-element'
import { InputProps } from '../oc-input';
import { SidebarItem } from '../../molecules';


import './style.scss';

export interface TextSearchProps extends InputProps {
	/**
	 * Marks the input as required
	 */
	required?: boolean;
	/**
	 * Set disabled state for input
	 */
	disabled?: boolean;
	/**
	 * Placeholder text for input
	 */
	placeholder?: string;
	/**
	 * Input value
	 */
	value?: string;
	/**
	 * onChange handler
	 */
	onChange(value:string): void;
	/**
	 * Magnifier image presence on input
	 */
	hasMagnifier?: boolean;
	/**
	 * Magnifier image presence on input
	 */
	hasClearTextControl?: boolean;
	/**
	 * search handler function
	 */
	enterAction?: React.MouseEventHandler;
	/**
	 * text for search button
	 */
	searchButtonText: string;
	/**
	 * text for clear button
	 */
	clearButtonText: string;
	/**
	 * array of searched tags
	 */
	selectedFilters?: SelectedFilters;
	/**
	 * handler for deleteing all tags
	 */
	handleDeleteAll?(): void;
	/**
	 * handler for deleteing specific tags
	 */
	handleTagDelete?(): void;
	/**
	 * click handler
	 */
	handleTagClick?(title:string, id?: string):void;
	/**
	 * text for clear All button
	 */
	clearAllText?: string;
}

export interface SelectedFilter extends SidebarItem {
	id: string;
}

export interface SelectedFilters {
	filters: SelectedFilter[];
	searchStr: string;
}

export const OcTextSearchComponent: React.FC<TextSearchProps> = (props) => {
	const {
		placeholder,
		value,
		onChange,
		hasMagnifier,
		hasClearTextControl,
		enterAction = noop,
		searchButtonText = 'Search',
		clearButtonText = 'Cancel',
		selectedFilters,
		handleDeleteAll,
		handleTagDelete,
		handleTagClick,
		clearAllText="Clear All",
	} = props;
	
	const handleChange = React.useCallback(
		(e : React.ChangeEvent<HTMLInputElement> & React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.key === 'Enter') {
				enterAction(e as unknown as React.MouseEvent);
			} else {
				onChange(e.currentTarget.value);
			}
		},
		[onChange, enterAction],
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				enterAction();
			}
		},
		[enterAction],
	);

	const clearSearch = React.useCallback(() => {
		onChange('');
	}, [onChange]);

	return (<>
		<div className="text-search">
			<div className="text-search__container">
				<input
					className="text-search__input"
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
				/>
				{hasMagnifier && (
					<TextSearchIcon viewBox="0 0 24 24" className="text-search__icon" onClick={enterAction} />
				)}
			</div>
			<div className="text-search__controls">
				{hasClearTextControl && (
					<div className="clear-button">
						<OcButtonComponent
							text={clearButtonText}
							type="secondary"
							onClick={clearSearch}
							customClass="oc-button_small-size "
						/>
					</div>
				)}
				{!hasMagnifier && (
					<div className="search-button">
						<OcButtonComponent
							text={searchButtonText}
							type="primary"
							onClick={enterAction}
							customClass="oc-button_small-size"
						/>
					</div>
				)}
			</div>
		</div>
		{selectedFilters && (selectedFilters.filters.length > 0 || selectedFilters.searchStr.length) > 0 &&
			<div className="search-tags">
				{selectedFilters.filters.map((filter:SelectedFilter) => (
					<OcTagElement
						title={filter?.parent.label}
						onIconClick={!handleTagClick ? undefined : () => handleTagClick(filter.parent.label)}
						key={filter.id + filter.parent.id}
					/>
				))}
				{selectedFilters.searchStr && (
					<OcTagElement 
						title={selectedFilters.searchStr} 
						onIconClick={handleTagDelete} 
					/>
				)}
				{(selectedFilters.filters.length > 0 || selectedFilters.searchStr) && <button className="clear-all" onClick={handleDeleteAll}>{clearAllText}</button>}
			</div>
		}
		</>
	);
};

export default OcTextSearchComponent;
