import * as React from 'react';

import { Button } from '../../atoms';


interface SelectListItemProps {
	name: string;
	children: React.ReactNode;
}

export const ListItem = React.forwardRef(
	(props: SelectListItemProps, ref: React.Ref<HTMLButtonElement>) => {
		const {
			children,
			...p
		} = props

		return (
			<Button
				{...p}
				ref={ref}
				type="secondary"
				customClass="select-component__dropdown-item dropdown-item"
			>
				{children}
			</Button>
		);
	},
);
