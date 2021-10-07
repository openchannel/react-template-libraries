import { api } from '../lib/api';
import { UserRoleResponse } from '../model/api/account-role.model';
import { Page } from '../model/api/page.model';

const USER_ROLE_URL = 'v2/userRoles';

export const userRole = {
	getUserRoles(pageNumber: number, pageLimit: number) {
		return api.get<any, Page<UserRoleResponse | any>>(USER_ROLE_URL, {
			params: {
				pageNumber: String(pageNumber),
				limit: String(pageLimit),
			},
		});
	},
};
