import { request, Options } from './request';

export const api = {
	get: (url: string, params: Options['params']) => request('GET', url, { params }),

	post: (url: string, options: Options) => request('POST', url, options),

	put: (url: string, options: Options) => request('PUT', url, options),

	patch: (url: string, options: Options) => request('PATCH', url, options),

	delete: (url: string) => request('DELETE', url),
};
