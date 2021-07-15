import fetchIntercept from 'fetch-intercept';

// import { auth } from '../service/authentication.service';

fetchIntercept.register({
	request: function (url, config) {
		// Modify the url or config here
		return [url, config];
	},

	responseError: (error) => {
		if (error?.status === 403 && error?.error?.toLowerCase()?.includes('csrf')) {
			// return auth.initCsrf().pipe(mergeMap(csrf => request));
			return fetch(error.request);
		}
		return Promise.reject(error);
	},
});
