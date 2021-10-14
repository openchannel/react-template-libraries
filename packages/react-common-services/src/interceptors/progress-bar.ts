import NProgress from 'nprogress';

import { requestInterceptor, responseInterceptor } from '../lib/interceptors';
import { CustomRequestConfig } from '../lib/request';

const calculatePercentage = (loaded: number, total: number) => Math.floor(loaded * 1.0) / total;

export const updateProgress = (ignore?: boolean) => (e: { loaded: any; total: any }) => {
	if (!ignore) {
		NProgress.inc(calculatePercentage(e.loaded, e.total));
	}
};

export const initProgressBar = (config = { showSpinner: false }) => {
	let requestsCounter = 0;

	const setupStartProgress = () => {
		requestInterceptor.use((config: CustomRequestConfig) => {
			if (!config.customTweaks?.ignoreNProgress) {
				requestsCounter++;
				NProgress.start();
			}

			return config;
		});
	};

	const setupStopProgress = () => {
		const responseFunc = (response: any) => {
			if (requestsCounter === 0 || --requestsCounter === 0) {
				NProgress.done();
			}
			return response;
		};

		const errorFunc = (error: any) => {
			if (requestsCounter === 0 || --requestsCounter === 0) {
				NProgress.done();
			}
			return Promise.reject(error);
		};

		responseInterceptor.use(responseFunc, errorFunc);
	};

	NProgress.configure(config);
	setupStartProgress();
	setupStopProgress();
};
