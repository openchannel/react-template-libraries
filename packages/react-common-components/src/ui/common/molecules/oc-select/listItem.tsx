import * as React from 'react';

import OcButtonComponent from '../../atoms/oc-button/oc-button';

export interface SelectListItemProps {
	name: string;
	children: React.ReactNode;
}

export const ListItem = React.forwardRef(
	(props: SelectListItemProps, ref: React.Ref<HTMLButtonElement>) => {
		const { children, ...p } = props;

		return (
			<OcButtonComponent
				{...p}
				ref={ref}
				type="secondary"
				customClass="select-component__dropdown-item dropdown-item"
			>
				{children}
			</OcButtonComponent>
		);
	},
);
