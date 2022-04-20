import * as React from 'react';

import { ListItemProps } from '../../../common';
import { Permission } from '../../models/user.model';

export interface PermissionsListItem extends ListItemProps {
	/** permissions object of current user */
	appPermissions?: Permission[];
}

export const WithPermissionsListItem = React.forwardRef(
	(props: PermissionsListItem, ref: React.Ref<any>) => {
		const { children, className, appPermissions, ...p } = props;

		return (
			<button {...p} ref={ref} type="button" className="dropdown-item cursor-pointer">
				{children}
			</button>
		);
	},
);
