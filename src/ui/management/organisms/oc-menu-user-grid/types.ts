import { ComponentsUsersGridParametersModel } from '../../models';

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
	 * Path to the custom icon for the "sort" button.
	 */
	sortIcon?: SVGElement;
	/**
	 * Output of menu list item clicked action.
	 * Contains an action name, userId, userAccountId
	 */
	// onMenuClick: EventEmitter<ComponentsUserGridActionModel> = new EventEmitter<ComponentsUserGridActionModel>();
	onMenuClick: () => void;
	/**
	 * Output with page number for new users request
	 * Start number = 1
	 */
	// pageScrolled: EventEmitter<number> = new EventEmitter<number>();

	/**
	 * Returns clicked sorting type.
	 * can be `name`, `email`, `date` or `role`
	 */
	// sortChosen: EventEmitter<SortField> = new EventEmitter<SortField>();
}
