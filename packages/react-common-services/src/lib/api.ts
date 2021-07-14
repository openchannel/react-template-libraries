import { request, Body } from './request';

export const api = {
	get: (url: string) => request('GET', url),

	post: (url: string, body: Body) => request('POST', url, { body }),

	put: (url: string, body: Body) => request('PUT', url, { body }),

	patch: (url: string, body: Body) => request('PATCH', url, { body }),

	delete: (url: string) => request('DELETE', url),
};
