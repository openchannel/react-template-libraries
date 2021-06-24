import { FullAppData } from '../../../common/models';

export interface OcAppCardProps {
	/**
	 * One App to show. Must consists fields: 'name', 'model', 'rating', 'reviewCount', 'summary' or 'description'.
	 */
	app: FullAppData;
	/**
	 * Router link for the more apps navigation
	 */
	appRedirectLink?: string;
}
