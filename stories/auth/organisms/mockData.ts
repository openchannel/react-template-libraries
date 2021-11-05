export const mockSignupConfigs = [
	{
		name: 'First Form',
		account: {
			includeFields: ['name', 'email'],
			typeData: {
				fields: [
					{
						id: 'name',
						type: 'text',
						label: 'Name',
						attributes: {
							required: true,
						},
					},
					{
						id: 'email',
						type: 'text',
						label: 'Email',
						attributes: {
							required: true,
						},
					},
					{
						id: 'about-me',
						type: 'text',
						attributes: {
							required: true,
						},
						label: 'About me',
					},
				],
			},
			type: 'first-account-form',
		},
		organization: {
			includeFields: ['customData.organization'],
			typeData: {
				fields: [
					{
						id: 'customData.company',
						type: 'text',
						label: 'Company',
						attributes: {
							required: true,
						},
					},
					{
						id: 'customData.country',
						type: 'text',
						label: 'Country',
						attributes: {
							required: true,
						},
					},
				],
			},
			type: 'first-organization-form',
		},
		fieldsOrder: ['email', 'name'],
	},
	{
		name: 'Second Form',
		account: {
			includeFields: ['name', 'email', 'about-me'],
			typeData: {
				fields: [
					{
						id: 'name',
						type: 'text',
						label: 'Name',
						attributes: {
							required: true,
						},
					},
					{
						id: 'email',
						type: 'text',
						label: 'Email',
						attributes: {
							required: true,
						},
					},
					{
						id: 'about-me',
						type: 'text',
						attributes: {
							required: true,
						},
						label: 'About me',
					},
				],
			},
			type: 'second-account-form',
		},
		organization: {
			includeFields: ['customData.organization', 'customData.country'],
			typeData: {
				fields: [
					{
						id: 'customData.company',
						type: 'text',
						label: 'Company',
						attributes: {
							required: true,
						},
					},
					{
						id: 'customData.country',
						type: 'text',
						label: 'Country',
						attributes: {
							required: true,
						},
					},
				],
			},
			type: 'second-organization-form',
		},
	},
];
