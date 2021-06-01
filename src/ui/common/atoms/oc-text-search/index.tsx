//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { InputProps } from '../oc-input';
import TextSearchIcon from '../../../../assets/img/text-search-icon.svg';
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
}

const enterAction = () => {};

export const OcTextSearchComponent: React.FC<TextSearchProps> = (props) => {
	const { placeholder, value, onChange } = props;
	const handleChange = React.useCallback(
		(e: any) => {
			onChange(e.target.value);
		},
		[onChange, value],
	);
	return (
		<div className="text-search">
			<input
				className="text-search__input"
				placeholder={placeholder}
				type="text"
				value={value}
				onChange={handleChange}
			/>
			<TextSearchIcon className="text-search__icon" onClick={enterAction} />
		</div>
	);
};
