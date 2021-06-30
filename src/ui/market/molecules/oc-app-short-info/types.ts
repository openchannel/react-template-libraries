import { FullAppData } from '../../../common/models';

export interface OcAppShortInfoProps {
	app: FullAppData;
	clickByApp: (app: FullAppData) => void;
	customDropdown?: JSX.Element;
}
