//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';

import TextSearchIcon from '../../../../assets/img/text-search-icon.svg';
import OcButtonComponent from '../oc-button';
import { InputProps } from '../oc-input';

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
	onChange: any;
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
}

export const OcTextSearchComponent: React.FC<TextSearchProps> = (props) => {
	const {
		placeholder,
		value,
		onChange,
		hasMagnifier,
		hasClearTextControl,
		enterAction,
		searchButtonText = 'Search',
		clearButtonText = 'Cancel',
	} = props;
	const handleChange = React.useCallback(
		(e: any) => {
			onChange(e.target.value);
		},
		[onChange],
	);
	const clearSearch = React.useCallback(() => {
		onChange('');
	}, [onChange]);
	return (
		<div className="text-search">
			<div className="text-search__container">
				<input
					className="text-search__input"
					placeholder={placeholder}
					type="text"
					value={value}
					onChange={handleChange}
				/>
				{hasMagnifier && <TextSearchIcon className="text-search__icon" onClick={enterAction} />}
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
	);
};
