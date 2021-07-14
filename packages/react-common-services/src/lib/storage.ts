import jwtDecode from 'jwt-decode';

import type { AccessLevel, PermissionType, Permission, UserDetails } from '../model/api/user.model';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

/**
 * Set JWT accessToken to the browser local storage.
 * @param token (required) JWT accessToken.
 * @return void;
 */
const setAccessToken = (token: string): void => {
	window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * Get JWT accessToken from the browser local storage.
 * @return string
 */
const getAccessToken = (): string => window.localStorage.getItem(ACCESS_TOKEN_KEY) || '';

/**
 * Set refreshToken to the browser local storage.
 * @param token (required) JWT refreshToken
 */
const setRefreshToken = (token: string): void => {
	window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

/**
 * Get JWT refreshToken from the browser local storage.
 * @return string;
 */
const getRefreshToken = (): string => window.localStorage.getItem(REFRESH_TOKEN_KEY) || '';

/**
 * Function for removing accessToken and refreshToken from the browser local storage.
 */
const removeTokens = (): void => {
	window.localStorage.removeItem(ACCESS_TOKEN_KEY);
	window.localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Put JWT tokens in browser local storage. Update UserDetails by new claims from the accessToken.
 * @param accessToken (required) JWT access token.
 * @param refreshToken (required) JWT refresh token.
 *
 * @return void;
 */
const persist = (accessToken: string, refreshToken: string): void => {
	setAccessToken(accessToken);
	setRefreshToken(refreshToken);

	if (!decodeToken()) {
		removeTokens();
	}
};

/**
 * Put JWT access token in browser local storage. Update UserDetails by new claims from the accessToken.
 * @param token (required) JWT access token.
 * @return void;
 */
const updateAccessToken = (token: string): void => {
	setAccessToken(token);

	if (!decodeToken()) {
		removeTokens();
	}
}

/**
 * When exists JWT tokens (access token and refresh token) in browser local storage, return true.
 */
const isUserLoggedIn = (): boolean => {
	return !!getAccessToken() && !!getRefreshToken();
};

const decodeToken = (): UserDetails | null => {
	const isTokenExist = getAccessToken();

	if (isTokenExist) {
		try {
			return jwtDecode(isTokenExist);
		} catch {
			return null;
		}
	}

	return null;
};

/**
 * User data from derived from the decoded JWT accessToken.
 */
const getUserDetails = (): UserDetails | null => {
	const decodedJWT = decodeToken();

	return decodedJWT ? decodedJWT : null
};

/**
 * Function for creating user name by current user details.
 * @return 'FirstName LastName'
 */
const getUserName = (): string => {
	const userDetails = getUserDetails();

	if (userDetails) {
		const firstName = userDetails?.firstName;
		const lastName = userDetails?.lastName;
		return `${firstName ? firstName : ''} ${lastName ? lastName : ''}`.trim();
	}

	return '';
};

/**
 * Function for checking user permissions. Used for blocking access for some functions or hiding DOM elements.
 *
 * @param type (required) Permission type : 'APPS','ACCOUNTS','DEVELOPERS','USERS','FILES','FORMS','OWNERSHIPS','REVIEWS','ORGANIZATIONS';
 * @param accessArray (required) Array of the access levels: 'READ', 'MODIFY', 'DELETE',
 *
 * @return boolean
 *
 * ### Example:
 * ``
 *   Note: Now permissions in JWT accessToken are : ['APPS.READ', 'APPS.MODIFY']
 *
 *   hasPermission('APPS', ['READ']);
 *   will be return true.
 *
 *   hasPermission('APPS', ['MODIFY']);
 *   will be return true.
 *
 *   hasPermission('APPS', ['DELETE']);
 *   will be return false.
 * ``
 */
const hasPermission = (type: PermissionType, accessArray: AccessLevel[]): boolean => {
	const userDetails = getUserDetails();

	if (userDetails?.permissions && type && accessArray) {
		return !!userDetails?.permissions.find((permission) => {
			if (permission) {
				const validType = permission.startsWith(type) || permission.startsWith('*');
				if (validType) {
					if (accessArray.find(access => permission.endsWith(access)) || permission.endsWith('*')) {
						return true;
					}
				}
			}
			return false;
		});
	}
	return false;
};

/**
 * Function for checking the array of the user permissions.
 * When will found the first match, from the incoming array 'permissions', the function returns true, else false.
 * Used for blocking access for some functions or hiding DOM elements.
 *
 * @param permissions (required) The array of permission for searching into current user permissions.
 *
 * @return boolean;
 *
 * ### Example:
 * ``
 * Note: Now permissions in JWT accessToken are : ['ACCOUNTS.MODIFY', 'ORGANIZATIONS.MODIFY']
 *
 * const permissions: Permission [] = [
 * {
 *  type: PermissionType.ACCOUNTS,
 *  access: [AccessLevel.READ]
 * },{
 *  type: PermissionType.ORGANIZATIONS,
 *  access: [AccessLevel.READ, AccessLevel.MODIFY, AccessLevel.DELETE]
 * }
 * ]
 *
 * hasAnyPermission(permissions);
 * return true;
 * ``
 */
const hasAnyPermission = (permissions: Permission[]): boolean => {
	return permissions ? !!permissions.find(p => hasPermission(p.type, p.access)) : false;
};

export const storage = {
	setAccessToken,
	setRefreshToken,
	getAccessToken,
	getRefreshToken,
	removeTokens,
	persist,
	updateAccessToken,
	isUserLoggedIn,
	decodeToken,
	getUserDetails,
	getUserName,
	hasPermission,
	hasAnyPermission,
};
