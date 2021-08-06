import { instance } from './instance';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Body = string | FormData | Record<string, unknown>;

type Params = URLSearchParams | { [key: string]: string };

type ResResult = {
	data: unknown | null;
	error: unknown | null;
};

export interface Options<ReqBody = unknown> {
	headers?: Headers | { [key: string]: string };
	params?: Params;
	body?: ReqBody | Body;
	handlers?: {
		onSuccess?: (response: ResResult) => void;
		onError?: (response: ResResult) => void;
	};
}

export const request = async <ReqBody>(
	method: Method,
	url: string,
	options: Options<ReqBody> = {},
) => {
	const baseUrl = instance.getUrl();

	const uri = `${baseUrl}/${url}${createParams(options)}`;

	const headers = new Headers({
		'Content-Type': 'application/json',
		...options.headers,
	});

	const _config = {
		method,
		headers,
		// mode: 'cors',
		// cache: 'no-cache',
		// credentials: 'same-origin',
		// ...options,
		body: createBody({ ...options, headers }),
	};

	const handlers = options && options.handlers;

	try {
		const response = await fetch(uri, _config);

		const contentTypeHeader = response.headers.get('Content-Type');
		const contentLengthHeader = Number(response.headers.get('content-length')) || 0;

		let data = null;

		if (Number(contentLengthHeader) === 0) {
			data = '';
		} else if (contentTypeHeader) {
			if (contentTypeHeader.includes('text')) {
				data = await response.text();
			}

			if (contentTypeHeader.includes('json')) {
				data = await response.json();
			}
		}

		let result: ResResult;

		if (response.ok) {
			result = { data, error: null };

			return handlers && handlers.onSuccess ? handlers.onSuccess(result) : result;
		}

		result = { data: null, error: data };

		return handlers && handlers.onError ? handlers.onError(result) : result;
	} catch (error) {
		if (handlers && handlers.onError) {
			handlers.onError(error);
		}
		console.error(error);
		return error;
	}
};

/**
 * @param {{ body?: {}, headers: Headers }} options
 */
const createBody = (options: Options): string | undefined => {
	if (options.body) {
		if (options.headers instanceof Headers) {
			const contentType = options.headers.get('content-type') || '';

			if (contentType.includes('json')) {
				return JSON.stringify(options.body);
			}
		}
	}
	return undefined;
};

const createParams = (options: Options) => {
	if (options.params instanceof URLSearchParams) {
		return options.params.toString();
	}

	if (options.params && Object.keys(options.params).length > 0) {
		const params = new URLSearchParams();

		for (const [key, value] of Object.entries(options.params)) {
			params.set(key, value);
		}

		return params.toString();
	}

	return '';
};
