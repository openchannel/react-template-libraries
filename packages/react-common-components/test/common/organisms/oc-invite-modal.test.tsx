import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcInviteModalProps } from '@openchannel/react-common-components/src/ui';
import OcInviteModal from '../../../src/ui/common/organisms/oc-invite-modal/oc-invite-modal';

const setUp = (props: OcInviteModalProps) => shallow(<OcInviteModal {...props} />);

describe('Invite Modal', () => {
	it('should create', () => {
		const component: ShallowWrapper = setUp({
			modalTitle: 'Invite a member',
			formConfig: {
				formId: '1',
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
			onSubmit: () => {},
			onClose: () => {},
			isOpened: false,
		});

		expect(component).toBeTruthy();
	});

	it('should create with additional props: size and className', () => {
		const component: ShallowWrapper = setUp({
			formConfig: {
				formId: '2',
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
			onClose: () => {},
			onSubmit: () => {},
			isOpened: false,
			modalTitle: 'Modal',
		});

		expect(component).toBeTruthy();
	});
});
