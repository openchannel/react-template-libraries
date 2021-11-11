import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { isNil } from 'lodash-es';

import { updateProgress } from '../interceptors/progress-bar';

import { instance } from './instance';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Body = string | FormData | Record<string, unknown>;

type Params = URLSearchParams | Record<string, unknown>;

export type Handlers = {
	onSuccess?: (result: Result) => void;
	onError?: (result: Result) => void;
};

export type Result = {
	data: unknown | null;
	error: unknown | null;
};

export type ReqHeaders = { [key: string]: string };

export interface Options<B = unknown> {
	headers?: ReqHeaders;
	params?: Params;
	body?: B | Body;
	handlers?: Handlers;
}

export interface CustomRequestConfigTweaks {
	/**
	 * if true - don't show global progress loading.
	 */
	ignoreNProgress?: boolean;
	/**
	 * if true - don't set x-csrf-token for Request Headers.
	 */
	noCsrfToken?: boolean;
}

export interface CustomRequestConfig extends AxiosRequestConfig {
	handlers?: Handlers;
	customTweaks?: CustomRequestConfigTweaks;
}

const request = async <B, R>(
	method: Method,
	url: string,
	options: Options<B> = {},
	customTweaks?: CustomRequestConfigTweaks,
): Promise<AxiosResponse<R>> => {
	const baseURL = instance.getUrl();

	const headers = {
		'Content-Type': 'application/json',
		...options.headers,
	};

	const _config: CustomRequestConfig = {
		url,
		method,
		baseURL,
		headers,
		params: createParams(options),
		data: createBody({ ...options, headers }),
		withCredentials: true,
		handlers: options.handlers,
		customTweaks,
		onDownloadProgress: updateProgress(customTweaks?.ignoreNProgress),
		onUploadProgress: updateProgress(customTweaks?.ignoreNProgress),
	};

	return axios(_config);
};

const axiosRequest = (config: AxiosRequestConfig) => {
	return axios(config);
};

/**
 * @param {{ body?: {}, headers: Headers }} options
 */
const createBody = (options: Options): string | FormData | undefined => {
	if (options.body) {
		const contentType = options.headers && options.headers['Content-Type'];

		if (contentType?.includes('json')) {
			return JSON.stringify(options.body);
		} else if (options.body instanceof FormData) {
			return options.body;
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
			if (!isNil(value)) {
				params.set(key, String(value));
			}
		}

		return params;
	}

	return undefined;
};

export { axios as axiosInstance, axiosRequest, request };
