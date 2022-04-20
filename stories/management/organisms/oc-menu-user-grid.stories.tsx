import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import OcMenuUserGrid from '../../../packages/react-common-components/src/ui/management/organisms/oc-menu-user-grid/oc-menu-user-grid';

const getDate = () => {
	const start = new Date(2021, 0, 1);
	const end = new Date();
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export default {
	title: 'Grid User',
	component: OcMenuUserGrid,
} as Meta;

const Component: Story<any> = (args) => <OcMenuUserGrid {...args} />;

export const UsersGrid = Component.bind({});
UsersGrid.args = {
	properties: {
		layout: 'table',
		data: {
			pages: 50,
			pageNumber: 1,
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
			count: 50,
		},
		options: ['EDIT', 'DELETE'],
	},
};
