import NProgress from 'nprogress';

import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import { axiosInstance } from '../lib/request';

const calculatePercentage = (loaded: number, total: number) => Math.floor(loaded * 1.0) / total;

export const initProgressBar = (config = { showSpinner: false }, instance = axiosInstance) => {
	let requestsCounter = 0;

	const setupStartProgress = () => {
		requestInterceptor.use((config) => {
			requestsCounter++;
			NProgress.start();
			return config;
		});
	};

	const setupUpdateProgress = () => {
		const update = (e: { loaded: any; total: any }) =>
			NProgress.inc(calculatePercentage(e.loaded, e.total));

		instance.defaults.onDownloadProgress = update;
		instance.defaults.onUploadProgress = update;
	};

	const setupStopProgress = () => {
		const responseFunc = (response: any) => {
			if (--requestsCounter === 0) {
				NProgress.done();
			}
			return response;
		};

		const errorFunc = (error: any) => {
			if (--requestsCounter === 0) {
				NProgress.done();
			}
			return Promise.reject(error);
		};

		responseInterceptor.use(responseFunc, errorFunc);
	};

	NProgress.configure(config);
	setupStartProgress();
	setupUpdateProgress();
	setupStopProgress();
};
