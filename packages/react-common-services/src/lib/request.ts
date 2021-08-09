import axios, { AxiosRequestConfig } from 'axios';

import { instance } from './instance';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Body = string | FormData | Record<string, unknown>;

type Params = URLSearchParams | { [key: string]: string };

export type Handlers = {
	onSuccess?: (result: Result) => void;
	onError?: (result: Result) => void;
};

export type Result = {
	data: unknown | null;
	error: unknown | null;
};

export interface Options<ReqBody = unknown> {
	headers?: { [key: string]: string };
	params?: Params;
	body?: ReqBody | Body;
	handlers?: Handlers;
}

export const request = async <ReqBody>(
	method: Method,
	url: string,
	options: Options<ReqBody> = {},
): Promise<any> => {
	const baseURL = instance.getUrl();

	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	const _config = {
		url,
		method,
		baseURL,
		headers,
		params: createParams(options),
		data: createBody({ ...options, headers }),
		withCredentials: true,
		handlers: options.handlers,
	};

	return axios(_config);
};

export const axiosRequest = (config: AxiosRequestConfig) => {
	return axios(config);
};

/**
 * @param {{ body?: {}, headers: Headers }} options
 */
const createBody = (options: Options): string | undefined => {
	if (options.body) {
		const contentType = options.headers && options.headers['Content-Type'];

		if (contentType?.includes('json')) {
			return JSON.stringify(options.body);
		}
	}
	return undefined;
};

const createParams = (options: Options) => {
	if (options.params instanceof URLSearchParams) {
		return options.params;
	}

	if (options.params && Object.keys(options.params).length > 0) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(options.params)) {
			params.set(key, value);
		}

		return params;
	}

	return undefined;
};
