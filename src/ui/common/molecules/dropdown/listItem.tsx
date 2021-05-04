import * as React from 'react';

import { DropdownVariants } from './index';


interface ListItemProps {
	type: DropdownVariants,
	className?: string;
	children: React.ReactNode,
}

export const ListItem = React.forwardRef(
	(props: ListItemProps, ref: React.Ref<HTMLButtonElement>) => {
		const {
			type,
			children,
			className,
			...p
		} = props

		const classByType = type === 'inline' ? 'dropdown-label__dropdown-item' : ''

		return (
			<button
				{...p}
				ref={ref}
				type="button"
				className={`${classByType} ${className}`}
			>
				{children}
			</button>
		);
	},
);
