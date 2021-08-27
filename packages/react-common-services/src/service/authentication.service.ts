import { api } from '../lib/api';
import { storage } from '../lib/storage';
import type { LoginRequest, LoginResponse, RefreshTokenRequest } from '../model/api/login.model';

const AUTH_URL = 'auth';
const INIT_CSRF_URL = `${AUTH_URL}/csrf`;

export const auth = {
	initCsrf: () => api.get(INIT_CSRF_URL),

	getAuthConfig: () => api.get(`${AUTH_URL}/config`),

	login: (body: LoginRequest) =>
		api.post<any, LoginResponse>(`${AUTH_URL}/external/token`, { body }),

	refreshToken: (body: RefreshTokenRequest) =>
		api.post<any, LoginResponse>(`${AUTH_URL}/refresh`, { body }),

	logOut: () =>
		api.post(`${AUTH_URL}/logout`, { body: { refreshToken: storage.getRefreshToken() } }),

	refreshTokenSilent: () => auth.refreshToken({ refreshToken: storage.getRefreshToken() }),

	tryLoginByRefreshToken: async () => {
		if (storage.isUserLoggedIn()) {
			return true;
		} else if (!storage.getRefreshToken()) {
			return false;
		} else {
			try {
				await auth.refreshTokenSilent();
				return true;
			} catch {
				return false;
			}
		}
	},
};
