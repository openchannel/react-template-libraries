import { CustomRequestConfigTweaks, Options, request } from './request';

export const api = {
	get: <B = unknown, R = any>(
		url: string,
		options?: Pick<Options, 'params' | 'headers'>,
		customTweaks?: CustomRequestConfigTweaks,
	) => request<B, R>('GET', url, options, customTweaks),

	post: <B = unknown, R = any>(
		url: string,
		options: Options<B>,
		customTweaks?: CustomRequestConfigTweaks,
	) => request<B, R>('POST', url, options, customTweaks),

	put: <B = unknown, R = any>(
		url: string,
		options: Options<B>,
		customTweaks?: CustomRequestConfigTweaks,
	) => request<B, R>('PUT', url, options, customTweaks),

	patch: <B = unknown, R = any>(
		url: string,
		options: Options<B>,
		customTweaks?: CustomRequestConfigTweaks,
	) => request<B, R>('PATCH', url, options, customTweaks),

	delete: <B = unknown, R = any>(url: string) => request<B, R>('DELETE', url),
};
