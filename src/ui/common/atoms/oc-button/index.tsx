//commit e098faba5e30e329fb877f8ccfbdfa23e1d861b5 Author: Vitaliy Samofal Date: 16.03.21, 16:45
import * as React from 'react';

import './style.scss';

export type ButtonVariants = 'primary' | 'secondary' | 'link' | 'danger' | 'none';

export type Dataset = {
	dataset: {
		[key: string]: any;
	};
}

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
	/**
	 * Checks if the button should be disabled
	 */
	disabled?: boolean;
	onClick?: React.MouseEventHandler;
	/**
	 * Checks if the button should be disabled
	 * @default button
	 */
	htmlType?: 'submit' | 'reset' | 'button';
	/**
	 * Checks if the button should be disabled
	 * @default primary
	 */
	type: ButtonVariants;
	customClass?: string;
	text: React.ReactNode;
	style?: React.CSSProperties;
	/**
	 * Checks if the button should be disabled
	 * @default false
	 */
	process?: boolean;

	children: React.ReactNode;
}

export const OcButtonComponent = React.forwardRef(
	(props: Partial<ButtonProps>, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const {
			htmlType = 'button',
			text,
			type = 'primary',
			customClass = '',
			process = false,
			children,
			...p
		} = props;

		const variantClass = type !== 'none' ? `oc-button_${type}` : '';

		return (
			<button
				ref={ref}
				type={htmlType}
				className={`oc-button ${variantClass} ${customClass}`}
				{...p}
			>
				{process && (
					<div className="oc-button__spinner">
						<div
							className="spinner-border la-ball-spin"
							style={{ width: '2.5rem', height: '2.5rem' }}
							role="status"
						/>
					</div>
				)}
				{Boolean(children) && !process && children}
				{!children && !process && <span className="oc-button__text">{text}</span>}
			</button>
		);
	},
);
