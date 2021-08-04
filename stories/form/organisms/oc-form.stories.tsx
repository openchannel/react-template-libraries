import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { AppFormModel, OcForm } from '../../../packages/react-common-components/src/ui/form';

const formJsonData: AppFormModel = {
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		{
			attributes: {
				maxCount: null,
				minCount: null,
				ordering: 'append',
				required: null,
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

export default {
	title: 'Form group component',
	component: OcForm,
} as Meta;

const Component: Story<any> = (args) => {
	return (
		<OcForm
			{...args}
		/>
	);
};

export const Default = Component.bind({});
Default.args = {
	formJsonData,
};

export const FormWithTestData = Component.bind({});
FormWithTestData.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				id: 'name',
				label: 'name',
				description: 'test',
				defaultValue: null,
				type: 'text',
				required: null,
				attributes: {
					maxChars: 20,
					required: true,
					minChars: 10,
				},
				options: null,
				subFieldDefinitions: null,
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
		],
	},
};

export const FormWithRequiredOnly = Component.bind({});
FormWithRequiredOnly.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				id: 'name',
				label: 'name',
				description: 'test',
				defaultValue: null,
				type: 'text',
				required: null,
				attributes: {
					maxChars: null,
					required: true,
					minChars: null,
				},
				options: null,
				subFieldDefinitions: null,
			},
			{
				id: 'role',
				label: 'role',
				description: '',
				defaultValue: null,
				type: 'dropdownList',
				required: null,
				attributes: { required: true },
				options: ['admin', 'user', 'test'],
				subFieldDefinitions: null,
			},
			{
				id: 'aboutme',
				label: 'aboutme',
				description: '',
				defaultValue: null,
				type: 'richText',
				required: null,
				attributes: {
					maxChars: null,
					required: null,
					minChars: null,
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
					minCount: null,
					maxCount: null,
					required: true,
				},
				options: null,
				subFieldDefinitions: null,
			},
		],
	},
	showButton: false,
};

export const FormWithNumberInput = Component.bind({});
FormWithNumberInput.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				attributes: {
					max: 25,
					min: 5,
					required: null,
				},
				category: 'CUSTOM',
				defaultValue: null,
				description: '',
				id: 'test-number',
				isOpen: false,
				isValid: true,
				label: 'Test number',
				placeholder: null,
				type: 'number',
			},
		],
	},
};

export const FormWithCheckboxComponent = Component.bind({});
FormWithCheckboxComponent.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithEmailComponent = Component.bind({});
FormWithEmailComponent.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithUrlComponent = Component.bind({});
FormWithUrlComponent.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithColorComponent = Component.bind({});
FormWithColorComponent.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithBooleanTags = Component.bind({});
FormWithBooleanTags.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithNumberTags = Component.bind({});
FormWithNumberTags.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithDateAndDateTime = Component.bind({});
FormWithDateAndDateTime.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithVideoUrlComponent = Component.bind({});
FormWithVideoUrlComponent.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
		],
	},
};

export const FormWithMultiSelect = Component.bind({});
FormWithMultiSelect.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
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
				placeholder: null,
				type: 'multiselectList',
			},
		],
	},
};

export const FormWithDynamicFieldArray = Component.bind({});
FormWithDynamicFieldArray.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				attributes: {
					maxCount: 3,
					minCount: 1,
					ordering: 'append',
					required: true,
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
				placeholder: null,
				subFieldDefinitions: [
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
				],
				type: 'dynamicFieldArray',
			},
		],
	},
	showButton: true,
	buttonPosition: 'left',
};

export const FormWithDynamicFieldArraySecondLvl = Component.bind({});
FormWithDynamicFieldArraySecondLvl.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				attributes: {
					maxCount: null,
					minCount: null,
					ordering: 'append',
					required: null,
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
						],
						type: 'dynamicFieldArray',
					},
				],
				type: 'dynamicFieldArray',
			},
		],
	},
};

export const FormWithDynamicFieldArrayThirdLvl = Component.bind({});
FormWithDynamicFieldArrayThirdLvl.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				attributes: {
					maxCount: null,
					minCount: null,
					ordering: 'append',
					required: null,
					rowLabel: null,
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
						attributes: {
							maxCount: null,
							minCount: null,
							ordering: 'append',
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
								id: 'field2',
								isOpen: false,
								isValid: true,
								label: 'field2',
								placeholder: 'write some text',
								type: 'text',
							},
							{
								attributes: {
									maxCount: null,
									minCount: 1,
									ordering: 'append',
									required: false,
									rowLabel: null,
								},
								required: null,
								rowLabel: null,
								category: 'CUSTOM',
								defaultValue: null,
								description: '',
								id: 'test-dynamic-field-array-3',
								isOpen: false,
								isValid: true,
								label: 'Test Dynamic field array 3',
								placeholder: null,
								fields: [
									{
										id: 'long-text-example2',
										label: 'Long Text Example2',
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
	},
};

export const FormWithUpdatedRichTextEditor = Component.bind({});
FormWithUpdatedRichTextEditor.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				id: 'rich-text-editor',
				label: 'Rich Text Editor',
				description: '',
				defaultValue: null,
				type: 'richText',
				required: null,
				attributes: {
					maxChars: 100,
					required: true,
					minChars: 10,
				},
				options: null,
			},
		],
	},
};

export const FormWithFileUpload = Component.bind({});
FormWithFileUpload.args = {
	formJsonData: {
		formId: 'test',
		name: 'test',
		createdDate: 1599982592157,
		fields: [
			{
				id: 'file-upload',
				label: 'File Upload',
				description: '',
				defaultValue: null,
				type: 'multiFile',
				required: null,
				attributes: {},
				options: null,
			},
			{
				id: 'file-upload-1',
				label: 'private single File Upload',
				description: '',
				defaultValue: null,
				type: 'privateSingleFile',
				required: null,
				attributes: {},
				options: null,
			},
			{
				id: 'file-upload-2',
				label: 'private multi File Upload',
				description: '',
				defaultValue: null,
				type: 'multiPrivateFile',
				required: null,
				attributes: {},
				options: null,
			},
		],
	},
};