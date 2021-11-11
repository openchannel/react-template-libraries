import { get } from 'lodash-es';

import { instance } from '../lib/instance';
import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import { memoryStorage } from '../lib/memory-storage';

requestInterceptor.use((config) => {
	if (!get(config, 'customTweaks.noCsrfToken', false) && config.baseURL?.startsWith(instance.getUrl())) {
		const token = memoryStorage.getXsrfToken();
		const headerName = instance.getHeaderName();

		if (token && headerName) {
			config.headers[headerName] = token;
		}
	}

	return config;
});

responseInterceptor.use(async (response) => {
	const headerName = instance.getHeaderName().toLowerCase();
	const xsrfToken = response.headers[headerName];

	if (xsrfToken) {
		await memoryStorage.setXsrfToken(xsrfToken);
	}

	return response;
});
