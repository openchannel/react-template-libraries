import * as React from 'react';

import { ListItemProps } from '../../../../common';

export const DropdownListItem = React.forwardRef(
	(props: ListItemProps, ref: React.Ref<HTMLButtonElement>) => {
		const { children, className, option, ...p } = props;

		return (
			<button
				{...p}
				ref={ref}
				type="button"
				className={`menu-${option.value.toLowerCase()} ${className}`}
			>
				{children}
			</button>
		);
	},
);
//Ctrl+C to my component
