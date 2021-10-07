import { ComponentsUserGridActionModel, ComponentsUsersGridParametersModel } from '../../models';

export interface OcMenuUserGridProps {
	/**
	 * Parameters for component model
	 */
	properties: ComponentsUsersGridParametersModel;
	/**
	 * Path to the custom icon for the hidden menu toggle button.
	 */
	menuUrl?: string;
	/**
	 * Output of menu list item clicked action.
	 * Contains an action name, userId, userAccountId
	 */
	onMenuClick?(action: ComponentsUserGridActionModel): void;
	/**
	 * Path to the custom icon for the "sort" button.
	 */
	sortIcon?: SVGElement;
	/**
	 * Returns clicked sorting type. Can be 'name', 'email', 'date' or 'role'.
	 */
	onSort?(v: string): void;
}
