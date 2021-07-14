import './interceptors';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Body = string | FormData | Record<string, unknown>;

type Options = {
	headers?: { [key: string]: string },
	body?: Body,
};

export const request = (method: Method, url: string, options?: Options) => {
	const uri = `${url}`;

	const headers = new Headers({
		'Content-Type': 'application-json',
		...options?.headers,
	});

	const config = new Request(uri, {
		method,
		headers,
		// ...options,
		body: createBody(options),
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
const createBody = (options: any): any => {
	if (options.body && options.headers.get('content-type').includes('json')) {
		return JSON.stringify(options.body);
	}
	return undefined;
};
