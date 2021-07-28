declare global {
	interface Window {
		__RCS_URL__: string;
		__RCS_HEADER_NAME__: string;
	}
}

const DEFAULT_HEADER_NAME = 'X-XSRF-TOKEN';

type InitInstance = { url: string; headerName: string };

export const instance = {
	setHeaderName: (headerName: string) => {
		if (!window.__RCS_HEADER_NAME__ || window.__RCS_HEADER_NAME__ !== headerName) {
			window.__RCS_HEADER_NAME__ = headerName;
		}

		return window.__RCS_HEADER_NAME__;
	},

	getHeaderName: () => {
		return window.__RCS_HEADER_NAME__;
	},

	setUrl: (url: string) => {
		if (!window.__RCS_URL__ || window.__RCS_URL__ !== url) {
			window.__RCS_URL__ = url;
		}

		return window.__RCS_URL__;
	},

	getUrl: () => {
		return window.__RCS_URL__;
	},

	init: ({ url, headerName = DEFAULT_HEADER_NAME }: InitInstance) => {
		if (url) {
			instance.setUrl(url);
		}

		if (headerName) {
			instance.setHeaderName(headerName);
		}
	},
};
