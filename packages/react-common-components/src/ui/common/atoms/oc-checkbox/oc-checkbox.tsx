//commit 97ffbca1eb0dab597b763664b1c78414ac62e6be Author: Vitaliy Samofal Date: 05.02.21, 14:38
import * as React from 'react';

import './style.scss';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Input value. Use text
	 */
	labelText?: React.ReactNode;
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
	onClick?: React.MouseEventHandler;
	/**
	 * Style which can be added to the title
	 * Supposed to be the style object
	 */
	style?: React.CSSProperties;
	touched?: string;
}

export const OcCheckboxComponent: React.FC<CheckboxProps> = (props) => {
	const { labelText, required, children = labelText, ...p } = props;

	return (
		// eslint-disable-next-line jsx-a11y/label-has-for
		<label className="form-checkbox">
			<input type="checkbox" className="form-checkbox__input form-checkbox__input_hidden" {...p} />
			<span className="form-checkbox__checkmark" />
			<span className="form-checkbox__label">
				{children}
				{required && <strong className="form-checkbox__required-glyph">*</strong>}
			</span>
		</label>
	);
};

export default OcCheckboxComponent;
