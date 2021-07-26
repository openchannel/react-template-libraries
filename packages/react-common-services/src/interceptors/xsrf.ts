import fetchIntercept from 'fetch-intercept';

import { instance } from '../lib/instance';
import { cookies } from '../lib/cookies';

fetchIntercept.register({
	request: (url, config) => {
		// Be careful not to overwrite an existing header of the same name.
		if (url.startsWith(instance.getUrl())) {
			const token = cookies.getXsrfToken();
			const headerName = instance.getHeaderName();

			if (token && !config.headers.has(headerName)) {
				const headers = new Headers(config.headers);
				headers.append(headerName, token);

				return [url, { headers, ...config }];
			}
		}

		return [url, config];
	},

	response: (response) => {
		const headerName = instance.getHeaderName();
		const xsrfToken = response.headers.get(headerName);

		if (xsrfToken) {
			cookies.setXsrfToken(xsrfToken);
		}

		return response;
	},

	responseError: (error) => {
		if (error?.status === 403 && error?.error?.toLowerCase()?.includes('csrf')) {
			// return auth.initCsrf().pipe(mergeMap(csrf => request));
			return fetch(error.request);
		}
		return Promise.reject(error);
	},
});
