import { fetchInterceptor } from '../lib/fetch-interceptor';
import { instance } from '../lib/instance';
import { memoryStorage } from '../lib/memory-storage';

fetchInterceptor({
	request: (url, originalConfig) => {
		// Be careful not to overwrite an existing header of the same name.
		if (url.startsWith(instance.getUrl())) {
			const token = memoryStorage.getXsrfToken();
			const headerName = instance.getHeaderName();

			if (token && !originalConfig.headers.has(headerName)) {
				const headers = new Headers(originalConfig.headers);
				headers.append(headerName, token);

				const config = {
					...originalConfig,
					headers,
				};

				return [url, config];
			}
		}

		return [url, originalConfig];
	},

	response: (response) => {
		const headerName = instance.getHeaderName();
		const xsrfToken = response.headers.get(headerName);

		if (xsrfToken) {
			memoryStorage.setXsrfToken(xsrfToken);
		}

		return response;
	},

	// responseError: (error) => {
	// 	if (error?.status === 403 && error?.error?.toLowerCase()?.includes('csrf')) {
	// 		// return auth.initCsrf().pipe(mergeMap(csrf => request));
	// 		return fetch(error.request);
	// 	}
	// 	return Promise.reject(error);
	// },
});
