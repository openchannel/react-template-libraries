import * as React from 'react';
import {
	useFormikContext,
	useFormik,
	FormikContext,
	Form as FormikForm,
	Field,
} from 'formik';

import { OcError, OcInputComponent, OcLabelComponent } from '../../../common';

import { AppFormModel } from './types';
import { getInitialValues, transform } from './utils';


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

const FormGroup = (props: any) => {
	const {
		children,
		error,
		label,
		labelFor,
		required,
	} = props;

	return (
		<>
			{label && <OcLabelComponent htmlFor={labelFor} required={required}>{label}</OcLabelComponent>}
			{children}
			{/*{error && <OcError message={error} />}*/}
		</>
	);
}

const FormGroupWrapper = (props: any) => {
	const formik = useFormikContext();
	const { error, touched } = formik.getFieldMeta(props.id);

	return (
		<FormGroup {...props} error={touched && !!error && error} />
	)
}

const RecursiveContainer: any = ({ fields, formik }) => {
	const builder = (element) => {
		const {
			id,
			label,
			// description,
			// defaultValue,
			type,
			name,
			required,
			// attributes,
			// options,
			// subFieldDefinitions,
			// fields,
			placeholder,
			// category,
		} = element;

		switch (type) {
			case 'text':
				return (
					<FormGroupWrapper
						name={id}
						label={label}
						labelFor={id}
						required={required}
						// title={}
					>
						<Field
							name={id}
							as={OcInputComponent}
							placeholder={placeholder}
							required={required}
							id={id}
							inputType="text"
						/>
					</FormGroupWrapper>
				);
			case 'number':
				return (
					<>
					</>
				)
			case 'dynamicFieldArray':
				return (
					<RecursiveContainer fields={element.fields || []} formik={formik} />
				);
			default:
				return <div>Unsupported field</div>
		}
	}

	return (
		fields.map((item) => (
			<div className="form__field">
				{builder(item)}
			</div>
		))
	);
}

export const OcForm: React.FC<any> = (props) => {
	const { data } = props;

	// const [form, setForm] = React.useState(formJsonData);

	const onSubmit = React.useCallback((...args) => {
		console.log('args', ...args)
	}, []);

	// const { initialValues, fields } = transform(formJsonData.fields);

	const formik = useFormik({
		// initialValues: getInitialValues(formJsonData.fields),
		initialValues: {},
		onSubmit,
		// enableReinitialize: true,
		// validationSchema,
		...props,
	});

	console.log('getInitialValues(formJsonData.fields)', getInitialValues(formJsonData.fields))
	// console.log('getInitialValues(formJsonData.fields)', transform(formJsonData.fields))

	return (
		<FormikContext.Provider value={formik}>
			<FormikForm className="form">

				<RecursiveContainer fields={formJsonData.fields} formik={formik} />

			</FormikForm>
		</FormikContext.Provider>
	)
}
