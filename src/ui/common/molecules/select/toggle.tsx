import * as React from 'react';

import { Button } from '../../atoms';


interface ToggleProps extends React.AriaAttributes {
	onClick: () => void;
	className: string;
	children: React.ReactNode;
}

export const Toggle = React.forwardRef(
	(props: ToggleProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
		const {
			onClick,
			className,
			'aria-expanded': ariaExpanded,
			'aria-haspopup': ariaHasPopup,
			children,
		} = props

		return (
			<Button
				ref={ref}
				aria-expanded={ariaExpanded}
				aria-haspopup={ariaHasPopup}
				type="secondary"
				customClass={`select-component__action ${className}`}
				onClick={onClick}
			>
				<div className="select-component__text">{children}</div>
			</Button>
		);
	},
);
