import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
	InviteUserContent,
} from '../../../src/ui/common/organisms/oc-invite-modal/content';
import {
	OcInviteModalProps
} from '../../../src/ui/common/organisms/oc-invite-modal';

const setUp = (props: Omit<OcInviteModalProps, 'isOpened' | 'size'>) => shallow(<InviteUserContent {...props} />);

describe('Invite Modal', () => {
	it('should create', () => {
		const component: ShallowWrapper = setUp({
			modalTitle: 'Invite a member',
			formConfig: {
				fields: [
					{
						id: 'name',
						label: 'Name',
						description: '',
						placeholder: 'Enter Name',
						defaultValue: null,
						type: 'text',
						required: null,
						attributes: {
							required: true,
						},
						options: null,
					},
					{
						id: 'email',
						label: 'Email',
						description: '',
						placeholder: 'Email',
						defaultValue: null,
						type: 'emailAddress',
						required: null,
						attributes: {
							required: true,
						},
						options: null,
					},
					{
						id: 'roles',
						label: 'Select role',
						description: '',
						defaultValue: '',
						type: 'dropdownList',
						required: true,
						attributes: { required: true },
						options: [],
					},
				],
			},
			buttonPosition: 'between',
			onSubmit: () => {},
			onClose: () => {},
		});

		expect(component).toBeTruthy();
	});
});
