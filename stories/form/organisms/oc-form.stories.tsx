import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { AppFormModel, OcForm } from '../../../src/ui/form';

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
	data: formJsonData,
};
