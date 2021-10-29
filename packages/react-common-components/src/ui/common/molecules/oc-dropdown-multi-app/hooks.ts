import React from 'react';
import { OptionTypeBase } from 'react-select';
import { debounce } from 'lodash-es';

import { AppsService } from './types';
import { appsToOptions } from './utils';

const DEBOUNCE_WAIT = 200;

const useAppsService = (appsService: AppsService, initialAppsIds: string[]) => {
	const [apps, setApps] = React.useState<OptionTypeBase[]>([]);
	const [selectedApps, setSelectedApps] = React.useState<OptionTypeBase[]>([]);

	React.useEffect(() => {
		const loadInitialApps = async () => {
			if (initialAppsIds.length > 0) {
				const query = JSON.stringify({
					appId: {
						$in: initialAppsIds,
					},
				});
				const {
					data: { list },
				} = await appsService.searchInitialMultiApps(query);
				setSelectedApps((selectedApps) => [...selectedApps, ...appsToOptions(list)]);
			}
		};

		loadInitialApps();
	}, []);

	const loadApps = React.useCallback(
		debounce(async (searchText: string, selectedAppsIds: string[]) => {
			const query =
				selectedAppsIds.length > 0
					? JSON.stringify({
							appId: {
								$nin: selectedAppsIds,
							},
					  })
					: '';

			const {
				data: { list },
			} = await appsService.searchMultiApps(searchText, query);
			setApps(appsToOptions(list));
		}, DEBOUNCE_WAIT),
		[setApps],
	);

	const resetApps = React.useCallback(() => {
		setApps([]);
	}, [setApps]);

	return {
		apps,
		loadApps,
		resetApps,
		selectedApps,
		setSelectedApps,
	};
};

export default useAppsService;
