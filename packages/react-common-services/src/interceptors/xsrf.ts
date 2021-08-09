import { instance } from '../lib/instance';
import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import { memoryStorage } from '../lib/memory-storage';

requestInterceptor.use((config) => {
	if (config.baseURL?.startsWith(instance.getUrl())) {
		const token = memoryStorage.getXsrfToken();
		const headerName = instance.getHeaderName();

		if (token && !config.headers[headerName]) {
			config.headers[headerName] = token;
		}
	}

	return config;
});

responseInterceptor.use((response) => {
	const headerName = instance.getHeaderName();
	const xsrfToken = response.headers[headerName];

	if (xsrfToken) {
		memoryStorage.setXsrfToken(xsrfToken);
	}

	return response;
});
