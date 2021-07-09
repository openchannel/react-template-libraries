import { OcMenuUserGridProps } from '../../../packages/react-common-components/organisms/oc-menu-user-grid';

const getDate = (): number => {
	const start = new Date(2021, 0, 1);
	const end = new Date();
	// @ts-ignore
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())) / 1000;
};

export const ocMenuUserGridPropertiesMock: OcMenuUserGridProps['properties'] = {
	layout: 'table',
	data: {
		// pages: 50,
		// pageNumber: 1,
		list: [
			{
				name: 'Emmy Lee',
				created: getDate(),
				email: 'testmail@.mail.com',
				userId: 'undefined_id',
				userAccountId: 'undefined_account_id',
				type: 'VIEWER',
				roles: ['VIEWER'],
				inviteStatus: 'INVITED',
				customData: { companyName: 'Company', interests: [] },
			},
			{
				name: 'Mark LL',
				created: getDate(),
				email: 'mark@test.com',
				userId: 'mark_id',
				userAccountId: 'mark_account_id',
				type: 'VIEWER',
				roles: ['VIEWER'],
				inviteStatus: 'ACTIVE',
				customData: { companyName: 'Mark Company', interests: [] },
			},
			{
				name: 'Johnny Lewis',
				created: getDate(),
				email: 'johnny@test.com',
				userId: 'johnny_id',
				userAccountId: 'johnny_account_id',
				type: 'ADMIN',
				roles: ['ADMIN'],
				inviteStatus: 'ACTIVE',
				customData: { companyName: 'Johnny Company', interests: [] },
			},
			{
				name: 'Test',
				created: getDate(),
				email: 'testtest@mail.com',
				userId: 'jon_id',
				userAccountId: 'jon_account_id',
				type: 'VIEWER',
				roles: ['VIEWER'],
				inviteStatus: 'INVITED',
				customData: { companyName: 'Jon Company', interests: [] },
			},
		],
		// count: 50,
	},
	options: ['EDIT', 'DELETE'],
};
