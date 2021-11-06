export const mockFormConfigs = [
	{
		"name": "Default",
		"organization": {
			"type": "default",
			"typeData": {
				"userTypeId": "default",
				"label": "Default",
				"description": null,
				"createdDate": 1614078094448,
				"fields": [
					{
						"id": "org--name",
						"label": "Company",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.rich-text",
						"label": "Rich Text",
						"description": "",
						"type": "richText",
						"attributes": {
							"maxChars": null,
							"required": null,
							"minChars": null,
							"group": ""
						}
					},
					{
						"id": "org--customData.long-text",
						"label": "Long text",
						"type": "longText",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.label",
						"label": "Label",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.list",
						"label": "list",
						"type": "multiselectList",
						"attributes": {
							"minCount": null,
							"maxCount": null,
							"required": true,
							"group": null
						},
						"options": [
							{
								"value": "a"
							},
							{
								"value": "b"
							},
							{
								"value": "c"
							}
						]
					},
					{
						"id": "org--customData.image",
						"label": "Image",
						"type": "singleImage",
						"attributes": {
							"width": null,
							"required": true,
							"hash": null,
							"accept": null,
							"height": null,
							"group": null
						}
					},
					{
						"id": "org--customData.multi-apps",
						"label": "Multi Apps",
						"type": "multiApp",
						"attributes": {
							"minCount": null,
							"maxCount": null,
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.color",
						"label": "Color",
						"type": "color",
						"attributes": {
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.date",
						"label": "Date",
						"type": "date",
						"attributes": {
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.dfa",
						"label": "DFA",
						"type": "dynamicFieldArray",
						"attributes": {
							"ordering": "append",
							"minCount": null,
							"rowLabel": null,
							"maxCount": null,
							"required": null,
							"group": null
						},
						"fields": [
							{
								"id": "text-1",
								"label": "Text1",
								"type": "text",
								"attributes": {
									"maxChars": null,
									"required": null,
									"minChars": null,
									"group": null
								}
							},
							{
								"id": "number",
								"label": "Number",
								"type": "number",
								"attributes": {
									"min": null,
									"max": null,
									"required": null,
									"group": null
								}
							}
						]
					},
					{
						"id": "org--customData.dfa1",
						"label": "DFA1",
						"type": "dynamicFieldArray",
						"attributes": {
							"ordering": "append",
							"minCount": null,
							"rowLabel": null,
							"maxCount": null,
							"required": null,
							"group": null
						},
						"fields": [
							{
								"id": "color3",
								"label": "Color3",
								"type": "color",
								"attributes": {
									"required": null,
									"group": null
								}
							},
							{
								"id": "checkbox",
								"label": "CheckBox",
								"type": "checkbox",
								"attributes": {
									"required": null,
									"group": null
								}
							}
						]
					},
					{
						"id": "org--customData.datetime",
						"label": "Datetime",
						"type": "datetime",
						"attributes": {
							"required": null,
							"group": null
						}
					}
				]
			},
			"includeFields": [
				"org--name",
				"org--customData.company"
			]
		},
		"account": {
			"type": "default",
			"typeData": {
				"userAccountTypeId": "default",
				"label": "Default",
				"description": null,
				"createdDate": 1612362086311,
				"fields": [
					{
						"id": "acc--name",
						"label": "Name",
						"type": "text",
						"attributes": {
							"required": false
						}
					},
					{
						"id": "acc--email",
						"label": "Email",
						"type": "emailAddress",
						"attributes": {
							"required": true
						}
					},
					{
						"id": "acc--username",
						"label": "Username",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": false,
							"minChars": null
						}
					},
					{
						"id": "acc--customData.number",
						"label": "Number",
						"type": "number",
						"attributes": {
							"min": null,
							"max": null,
							"required": null,
							"group": null
						}
					},
					{
						"id": "acc--customData.file",
						"label": "File",
						"type": "singleFile",
						"attributes": {
							"required": null,
							"hash": null,
							"accept": null,
							"group": null
						}
					},
					{
						"id": "acc--customData.dropdown-list",
						"label": "Dropdown List",
						"type": "dropdownList",
						"attributes": {
							"required": null,
							"group": null
						},
						"options": [
							{
								"value": "12"
							},
							{
								"value": "11"
							},
							{
								"value": "13"
							},
							{
								"value": "14"
							},
							{
								"value": "15"
							}
						]
					},
					{
						"id": "acc--customData.dfa1",
						"label": "DFA1",
						"type": "dynamicFieldArray",
						"attributes": {
							"ordering": "append",
							"minCount": null,
							"rowLabel": null,
							"maxCount": null,
							"required": null,
							"group": null
						},
						"fields": [
							{
								"id": "color",
								"label": "Color",
								"defaultValue": "#932424",
								"type": "color",
								"attributes": {
									"required": null,
									"group": null
								}
							},
							{
								"id": "dfa2",
								"label": "DFA2",
								"type": "dynamicFieldArray",
								"attributes": {
									"ordering": "append",
									"minCount": null,
									"rowLabel": null,
									"maxCount": null,
									"required": null,
									"group": null
								},
								"fields": [
									{
										"id": "number-tag",
										"label": "Number Tag",
										"type": "numberTags",
										"attributes": {
											"minCount": null,
											"maxCount": null,
											"required": null,
											"group": null
										}
									}
								]
							}
						]
					},
					{
						"id": "acc--customData.color",
						"label": "Color",
						"description": "",
						"type": "color",
						"attributes": {
							"required": null,
							"group": null
						}
					}
				]
			},
			"includeFields": [
				"acc--name",
				"acc--email"
			]
		},
		"fieldsOrder": [
			"acc--name",
			"acc--email",
			"org--name",
			"acc--password"
		]
	},
	{
		"name": "Custom",
		"organization": {
			"type": "custom-user-type",
			"typeData": {
				"userTypeId": "custom-user-type",
				"label": "Custom User Type",
				"description": null,
				"createdDate": 1618486903732,
				"fields": [
					{
						"id": "org--name",
						"label": "Company name",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null
						}
					},
					{
						"id": "org--customData.about-my-company",
						"label": "About my company",
						"description": "Long Text",
						"type": "longText",
						"attributes": {
							"maxChars": null,
							"required": null,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.multi-app",
						"label": "Multi App",
						"type": "multiApp",
						"attributes": {
							"minCount": null,
							"maxCount": null,
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.summary",
						"label": "Summary",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.image",
						"label": "Image",
						"type": "singleImage",
						"attributes": {
							"width": null,
							"required": null,
							"hash": null,
							"accept": null,
							"height": null,
							"group": null
						}
					},
					{
						"id": "org--customData.terms-of-service-url",
						"label": "Terms Of Service Url",
						"type": "websiteUrl",
						"attributes": {
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.images",
						"label": "Images",
						"type": "multiImage",
						"attributes": {
							"width": null,
							"minCount": null,
							"maxCount": null,
							"required": null,
							"hash": null,
							"accept": null,
							"height": null,
							"group": null
						}
					},
					{
						"id": "org--customData.support-url",
						"label": "Support Url",
						"type": "websiteUrl",
						"attributes": {
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.description",
						"label": "Description",
						"type": "richText",
						"attributes": {
							"maxChars": null,
							"required": null,
							"minChars": null,
							"group": null
						}
					},
					{
						"id": "org--customData.contact-email",
						"label": "Contact Email",
						"type": "emailAddress",
						"attributes": {
							"required": null,
							"group": null
						}
					},
					{
						"id": "org--customData.categories",
						"label": "Categories",
						"type": "multiselectList",
						"attributes": {
							"minCount": null,
							"maxCount": null,
							"required": null,
							"group": null
						},
						"options": [
							{
								"value": "Productivity"
							},
							{
								"value": "File Management"
							}
						],
						"placeholder": "Add categories"
					},
					{
						"id": "org--customData.dfa-tags",
						"label": "DFA tags",
						"type": "dynamicFieldArray",
						"attributes": {
							"ordering": "append",
							"minCount": null,
							"rowLabel": null,
							"maxCount": null,
							"required": null,
							"group": null
						},
						"fields": [
							{
								"id": "number-tags",
								"label": "Number Tags",
								"type": "numberTags",
								"attributes": {
									"minCount": null,
									"maxCount": null,
									"required": null,
									"group": null
								}
							},
							{
								"id": "tags",
								"label": "Tags",
								"type": "tags",
								"attributes": {
									"minCount": null,
									"maxCount": null,
									"required": null,
									"group": null
								}
							},
							{
								"id": "dfa-2",
								"label": "dfa 2",
								"type": "dynamicFieldArray",
								"attributes": {
									"ordering": "append",
									"minCount": null,
									"rowLabel": null,
									"maxCount": null,
									"required": null,
									"group": null
								},
								"fields": [
									{
										"id": "number",
										"label": "number",
										"type": "number",
										"attributes": {
											"min": null,
											"max": null,
											"required": null,
											"group": null
										}
									},
									{
										"id": "boolean-tags",
										"label": "Boolean Tags",
										"type": "booleanTags",
										"attributes": {
											"minCount": null,
											"maxCount": null,
											"required": null,
											"group": null
										}
									}
								]
							}
						]
					},
					{
						"id": "org--customData.datetime",
						"label": "Datetime",
						"description": "",
						"type": "datetime",
						"attributes": {
							"required": null,
							"group": null
						}
					}
				]
			},
			"includeFields": [
				"org--name",
				"org--customData.about-my-company"
			]
		},
		"account": {
			"type": "custom-account-type",
			"typeData": {
				"userAccountTypeId": "custom-account-type",
				"label": "Custom Account Type",
				"description": null,
				"createdDate": 1618487066263,
				"fields": [
					{
						"id": "acc--name",
						"label": "You name",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": true,
							"minChars": null
						}
					},
					{
						"id": "acc--username",
						"label": "Username",
						"type": "text",
						"attributes": {
							"required": false
						}
					},
					{
						"id": "acc--email",
						"label": "Email",
						"type": "emailAddress",
						"attributes": {
							"required": true
						}
					},
					{
						"id": "acc--customData.about-me",
						"label": "About me",
						"type": "text",
						"attributes": {
							"maxChars": null,
							"required": false,
							"minChars": null,
							"group": null
						}
					}
				]
			},
			"includeFields": [
				"acc--name",
				"acc--username",
				"acc--email",
				"acc--customData.about-me"
			]
		},
		"fieldsOrder": []
	}
];

export const formJsonData: any = {
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		{
			attributes: {
				maxCount: null,
				minCount: null,
				ordering: 'append',
				// required: null,
				rowLabel: 'field1',
			},
			required: null,
			rowLabel: null,
			category: 'CUSTOM',
			defaultValue: null,
			description: '',
			id: 'test-dynamic-field-array',
			isOpen: false,
			isValid: true,
			label: 'Test Dynamic field array',
			// placeholder: null,
			fields: [
				{
					attributes: {
						maxChars: null,
						minChars: null,
						// required: null,
					},
					category: 'CUSTOM',
					defaultValue: null,
					description: 'some description',
					id: 'field1',
					// isOpen: false,
					label: 'field1',
					placeholder: 'write some text',
					type: 'text',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: null,
					description: null,
					id: 'test-color-component',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test Color Component',
					placeholder: 'Choose your color',
					type: 'color',
				},
				{
					id: 'role',
					label: 'role',
					description: '',
					defaultValue: 'user',
					type: 'dropdownList',
					required: null,
					attributes: { required: true },
					options: ['admin', 'user', 'test'],
					subFieldDefinitions: null,
				},
				{
					attributes: {
						required: true,
						maxCount: 3,
						minCount: 2,
					},
					options: ['One', 'Two', 'Three', 'Five'],
					category: 'CUSTOM',
					defaultValue: [],
					description: null,
					id: 'multi-select-test',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Multi Select test',
					placeholder: 'select some',
					type: 'multiselectList',
				},
				{
					attributes: {
						max: 25,
						min: 5,
						required: null,
					},
					defaultValue: null,
					description: '',
					id: 'test-number',
					label: 'Test number',
					placeholder: null,
					type: 'number',
				},
				{
					id: 'long-text-example',
					label: 'Long Text Example',
					type: 'longText',
					placeholder: 'Write your text here...',
					category: 'CUSTOM',
					defaultValue: null,
					attributes: {
						maxChars: 200,
						required: null,
						minChars: 2,
					},
				},
				{
					id: 'aboutme',
					label: 'aboutme',
					description: '',
					defaultValue: null,
					type: 'richText',
					required: null,
					attributes: {
						maxChars: 150,
						required: null,
						minChars: 10,
					},
					options: null,
					subFieldDefinitions: null,
				},
				{
					id: 'skills',
					label: 'skills',
					description: 'skills',
					defaultValue: ['angular'],
					type: 'tags',
					required: null,
					attributes: {
						minCount: 1,
						maxCount: 5,
						required: true,
					},
					options: ['angular', 'react', 'react native', 'spring'],
					subFieldDefinitions: null,
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: true,
					description: '',
					id: 'test-checkbox',
					isOpen: false,
					isValid: true,
					label: 'Test Checkbox',
					placeholder: null,
					type: 'checkbox',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: null,
					description: '',
					id: 'test-email',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test email',
					placeholder: 'enter email',
					type: 'emailAddress',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: null,
					description: null,
					id: 'test-url-component',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test URL component',
					placeholder: 'Enter your link here..',
					type: 'websiteUrl',
				},
				{
					attributes: {
						required: true,
						maxCount: null,
						minCount: null,
					},
					options: ['true', 'false'],
					category: 'CUSTOM',
					defaultValue: null,
					description: null,
					id: 'test-boolean-tags',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test Boolean tags',
					placeholder: null,
					type: 'booleanTags',
				},
				{
					attributes: {
						required: true,
						maxCount: 2,
						minCount: 1,
					},
					options: ['1', '3', '45'],
					category: 'CUSTOM',
					defaultValue: [],
					description: null,
					id: 'test-number-tags',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test number tags',
					placeholder: null,
					type: 'numberTags',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: null,
					description: null,
					id: 'test-date-picker',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test Date picker',
					placeholder: null,
					type: 'date',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: 1602489693553,
					description: null,
					id: 'test-datetime-picker',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test date-time picker',
					placeholder: null,
					type: 'datetime',
				},
				{
					attributes: {
						required: true,
					},
					category: 'CUSTOM',
					defaultValue: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
					description: null,
					id: 'test-video-url-comp',
					isOpen: false,
					isValid: true,
					deleteable: false,
					label: 'Test videoUrl component',
					placeholder: null,
					type: 'videoUrl',
				},
				{
					attributes: {
						maxCount: null,
						minCount: null,
						ordering: 'prepend',
						required: null,
						rowLabel: null,
					},
					required: null,
					rowLabel: null,
					category: 'CUSTOM',
					defaultValue: null,
					description: '',
					id: 'test-dynamic-field-array-2',
					isOpen: false,
					isValid: true,
					label: 'Test Dynamic field array 2',
					placeholder: null,
					fields: [
						{
							attributes: {
								maxChars: null,
								minChars: null,
								required: null,
							},
							category: 'CUSTOM',
							defaultValue: null,
							description: 'some description',
							id: 'field1',
							isOpen: false,
							isValid: true,
							label: 'field1',
							placeholder: 'write some text',
							type: 'text',
						},
						{
							attributes: {
								maxCount: null,
								minCount: null,
								ordering: 'prepend',
								required: null,
								rowLabel: null,
							},
							required: null,
							rowLabel: null,
							category: 'CUSTOM',
							defaultValue: null,
							description: '',
							id: 'one-more',
							isOpen: false,
							isValid: true,
							label: 'one-more',
							placeholder: null,
							fields: [
								{
									attributes: {
										maxChars: null,
										minChars: null,
										required: null,
									},
									category: 'CUSTOM',
									defaultValue: null,
									description: 'some description',
									id: 'one-more-2',
									isOpen: false,
									isValid: true,
									label: 'one-more-2',
									placeholder: 'write some text',
									type: 'text',
								},
							],
							type: 'dynamicFieldArray',
						},
					],
					type: 'dynamicFieldArray',
				},
			],
			type: 'dynamicFieldArray',
		},
	],
};