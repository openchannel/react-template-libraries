import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcInviteModal, InviteModalProps } from '@openchannel/react-common-components';

const setUp = (props: InviteModalProps) => shallow(<OcInviteModal {...props} />);

describe('Invite Modal', () => {
	it('should create', () => {
		const component: ShallowWrapper = setUp({
			modalData: {
				modalTitle: 'Invite a member',
				successButtonText: 'Send invite',
			},
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
							maxChars: null,
							required: true,
							minChars: null,
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
							maxChars: null,
							required: true,
							minChars: null,
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
			isOpened: false,
			modalTitle: 'Modal',
		});

		expect(component).toBeTruthy();
	});

	it('should create with additional props: size and className', () => {
		const component: ShallowWrapper = setUp({
			modalData: {
				modalTitle: 'Invite a member',
				successButtonText: 'Send invite',
			},
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
							maxChars: null,
							required: true,
							minChars: null,
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
							maxChars: null,
							required: true,
							minChars: null,
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
			isOpened: false,
			modalTitle: 'Modal',
		});

		expect(component).toBeTruthy();
	});
});
