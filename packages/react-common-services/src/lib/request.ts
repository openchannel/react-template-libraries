import './interceptors';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type Body = string | FormData | Record<string, unknown>;

type Params = URLSearchParams | { [key: string]: string };

export type Options<ReqBody = unknown> = {
	headers?: Headers | { [key: string]: string };
	params?: Params;
	body?: ReqBody | Body;
};

export const request = <ReqBody>(method: Method, url: string, options: Options<ReqBody> = {}) => {
	const uri = `${url}${createParams(options)}`;

	const headers = new Headers({
		'Content-Type': 'application-json',
		...options.headers,
	});

	const config = new Request(uri, {
		method,
		headers,
		// ...options,
		body: createBody({ ...options, headers }),
	});

	return fetch(config).then((response) => {
		const contentType = response.headers.get('Content-Type');

		if (contentType && contentType.includes('json')) {
			return response.json();
		}

		throw new TypeError('Unexpected content-type');
	});
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
