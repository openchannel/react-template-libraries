//commit d44982a23598e68832a23e5617c07e6d717e855e Author: Julia Date: 04.12.20, 13:13
import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Marks the input as required
	 */
	required?: boolean;
	/**
	 * Type of the input. Can be 'text', 'email', 'password'
	 */
	inputType?: 'text' | 'email' | 'password';
	/**
	 * Autocomplete
	 */
	autocomplete?: boolean;
	/**
	 * Set auto focus to true or false
	 */
	autoFocus?: boolean;
	/**
	 * List of classes which can be attached to the current list
	 */
	customClass?: string;
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
	 * Change hander input function
	 */
	onChange?: any;
	/**
	 * Style which can be added to the title
	 * Supposed to be the style object
	 */
	style?: React.CSSProperties;
}

export const OcInputComponent: React.FC<InputProps> = (props) => {
	const { customClass, inputType, value, ...p } = props;

	return <input type={inputType} className={`form-control ${customClass}`} value={value} {...p} />;
};
