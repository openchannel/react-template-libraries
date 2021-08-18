import { Options, request } from './request';

export const api = {
	get: <B = unknown, R = any>(url: string, options?: Pick<Options, 'params' | 'headers'>) => request<B, R>('GET', url, options),

	post: <B = unknown, R = any>(url: string, options: Options<B>) => request<B, R>('POST', url, options),

	put: <B = unknown, R = any>(url: string, options: Options<B>) => request<B, R>('PUT', url, options),

	patch: <B = unknown, R = any>(url: string, options: Options<B>) => request<B, R>('PATCH', url, options),

	delete: <B = unknown, R = any>(url: string) => request<B, R>('DELETE', url),
};
