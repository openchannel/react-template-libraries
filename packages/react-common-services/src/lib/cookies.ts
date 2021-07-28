import Cookie from 'js-cookie';

import { instance } from './instance';

export const cookies = {
	setXsrfToken: (token: string) => Cookie.set(instance.getHeaderName(), token),

	getXsrfToken: () => Cookie.get(instance.getHeaderName()) || '',

	removeXsrfToken: () => Cookie.remove(instance.getHeaderName()),
};
