import * as React from 'react';

import { ListItemProps } from '../types';

export const ListItem = React.forwardRef(
	(props: ListItemProps, ref: React.Ref<HTMLButtonElement>) => {
		const { variant, children, className, ...p } = props;

		const classByVariant = variant === 'inline' ? 'dropdown-label__dropdown-item' : '';

		return (
			<button {...p} ref={ref} type="button" className={`${classByVariant} ${className}`}>
				{children}
			</button>
		);
	},
);
