import * as React from 'react';
import { useFormik, FormikContext, Form as FormikForm, FormikProps, Field, FieldArray } from 'formik';
import { AppFormFieldAttributes } from './types';

import { AppFormModel, AppFormField } from './types';
import { getInitialValues } from './utils';


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
};

const RecursiveContainer: any = ({ fields, formik }) => {
	const builder = (element) => {
		const {
			// id,
			// label,
			// description,
			// defaultValue,
			type,
			// required,
			// attributes,
			// options,
			// subFieldDefinitions,
			fields,
			// placeholder,
			// category,
		} = element;

		console.log('element', element)

		switch (type) {
			case 'text':
				return (
					<Field>
					</Field>
				);
			case 'number':
				return (
					<>
					</>
				)
			case 'dynamicFieldArray':
				return (
					<RecursiveContainer fields={fields || []} formik={formik} />
				);
			default:
				return <div>Unsupported field</div>
		}
	}

	return (
		fields.map(builder)
	);
}

export const Form: React.FC<any> = (props) => {
	const { data } = props;

	const [form, setForm] = React.useState(formJsonData);

	const onSubmit = React.useCallback((...args) => {
		console.log('args', ...args)
	}, []);

	const formik = useFormik({
		initialValues: getInitialValues(formJsonData.fields),
		onSubmit,
		// enableReinitialize: true,
		// validationSchema,
		...props,
	});

	return (
		<FormikContext.Provider value={formik}>
			<FormikForm>

				<RecursiveContainer fields={formJsonData.fields} formik={formik} />

			</FormikForm>
		</FormikContext.Provider>
	)
}
