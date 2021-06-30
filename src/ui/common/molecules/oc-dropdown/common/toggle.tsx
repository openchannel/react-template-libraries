import * as React from 'react';

import { ToggleProps } from '../types';

export const Toggle = React.forwardRef(
	(props: ToggleProps, ref: React.ForwardedRef<HTMLDivElement>) => {
		const { variant, onClick, className, 'aria-haspopup': ariaHasPopup, children } = props;

		const classByVariant =
			variant === 'inline' ? 'dropdown-label__text' : 'dropdown-button__placeholder-container';

		return (
			<div
				id="dropdown"
				ref={ref}
				aria-haspopup={ariaHasPopup}
				tabIndex={0}
				className={`${classByVariant} ${className}`}
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
