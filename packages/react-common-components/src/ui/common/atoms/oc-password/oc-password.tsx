//eslint-disable jsx-a11y
import * as React from 'react';

import './style.scss';

export interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
	/**
	 * Marks the input as required
	 *
	 * @default false
	 */
	required?: boolean;
	/**
	 * Set disabled state for input
	 *
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Placeholder text for input
	 */
	placeholder?: string;
	/**
	 * Input value
	 */
	value: string;
	onChange: (e: React.SyntheticEvent) => void;
	/**custom classname to be passed */
	customClass?: string;
}

export const OcPasswordComponent: React.FC<PasswordProps> = (props) => {
	const { customClass, ...p } = props;
	const [isPassword, toggle] = React.useReducer((is) => !is, false);

	return (
		<div className="oc-password">
			<input
				{...p}
				type={isPassword ? 'text' : 'password'}
				className={`oc-password__input ${customClass}`}
			/>
			<span
				onClick={toggle}
				className={`toggle_password ${isPassword ? 'fa-eye-slash' : ''}`}
				tabIndex={0}
			/>
		</div>
	);
};

export default OcPasswordComponent;
