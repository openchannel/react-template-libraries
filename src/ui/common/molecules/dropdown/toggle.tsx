import * as React from 'react';
import { DropdownToggleProps } from 'react-bootstrap/DropdownToggle';

import { DropdownVariants } from './index';


interface ToggleProps extends DropdownToggleProps {
	type: DropdownVariants;
}

export const Toggle = React.forwardRef(
	(props: ToggleProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const {
			type,
			onClick,
			className,
			'aria-haspopup': ariaHasPopup,
			children,
		} = props

		const classByType = type === 'inline' ? 'dropdown-label__text' : 'dropdown-button__placeholder-container'

		return (
			<div
				id="dropdown"
				ref={ref}
				aria-haspopup={ariaHasPopup}
				tabIndex={0}
				className={`${classByType} ${className} `}
				role="button"
				onClick={onClick}
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				onKeyDown={onClick}
			>
				{children}
			</div>
		);
	},
);
