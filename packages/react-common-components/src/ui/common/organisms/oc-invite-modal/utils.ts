export const inviteFormConfig = {
	fields: [
		{
			id: 'name',
			label: 'Name',
			description: '',
			placeholder: 'Enter Name',
			defaultValue: '',
			type: 'text',
			attributes: {
				required: true,
			},
		},
		{
			id: 'email',
			label: 'Email',
			description: '',
			placeholder: 'Email',
			defaultValue: '',
			type: 'emailAddress',
			attributes: {
				required: true,
			},
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
};
