import { api } from '../lib/api';
import { storage } from '../lib/storage';
import type { LoginRequest, LoginResponse, RefreshTokenRequest } from '../model/api/login.model';

const AUTH_URL = 'auth';
const INIT_CSRF_URL = `${AUTH_URL}/csrf`;

export const auth = {
	initCsrf: () => api.get(INIT_CSRF_URL),

	getAuthConfig: () => api.get(`${AUTH_URL}/config`),

	login: (body: LoginRequest): Promise<LoginResponse> =>
		api.post(`${AUTH_URL}/external/token`, { body }),

	refreshToken: (body: RefreshTokenRequest): Promise<LoginResponse> =>
		api.post(`${AUTH_URL}/refresh`, { body }),

	logOut: () =>
		api.post(`${AUTH_URL}/logout`, { body: { refreshToken: storage.getRefreshToken() } }),

	refreshTokenSilent: async () => {
		try {
			const response: LoginResponse = await auth.refreshToken({
				refreshToken: storage.getRefreshToken(),
			});
			storage.persist(response.accessToken, response.refreshToken);
			return response;
		} catch (error) {
			console.error('refreshTokenSilent', error);
			storage.removeTokens();
			throw error;
		}
	},

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
