import {FullAppData} from '../../models';
import {OptionTypeBase} from 'react-select';

export const appsToOptions = (apps: FullAppData[]): OptionTypeBase[] => apps.map((app) => ({
	label: app.name,
	value: app
}));
