import { OptionTypeBase } from 'react-select';

import { FullAppData } from '../../models';

export const appsToOptions = (apps: FullAppData[]): OptionTypeBase[] =>
	apps.map((app) => ({
		label: app.name,
		value: app,
	}));
