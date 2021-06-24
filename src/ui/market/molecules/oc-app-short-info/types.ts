import { FullAppData } from '../../../common/models';

export interface OcAppShortInfoProps {
	app: FullAppData;
	clickByApp: (app: FullAppData) => void;
	customDropdown?: JSX.Element;
}

export interface ParsePrice {
	type?: string;
	price: number;
	currency?: string;
	billingPeriod?: string | 'daily' | 'weekly' | 'monthly' | 'annually';
}
