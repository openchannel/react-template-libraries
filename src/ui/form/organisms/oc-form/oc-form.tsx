import * as React from 'react';
import {
	useFormikContext,
	useFormik,
	FormikContext,
	Form as FormikForm,
	Field,
} from 'formik';

import { OcColorComponent, OcError, OcInputComponent } from '../../../common';
import { OcTooltipLabel } from '../../atoms';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';

import { AppFormModel } from './types';
import { getValidParams } from './utils';

import './style.scss';


const formJsonData: AppFormModel = {
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		{
			attributes: {
				maxCount: 4,
				minCount: 2,
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

const FormikFieldWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcColorComponent colorValue={field.value} onValueChange={onChange} />
	)
}

const FormGroup = (props: any) => {
	const {
		children,
		error,
		label,
		labelFor,
		description,
		required,
	} = props;

	return (
		<>
			{label && (
				<div className="form__field-label">
					<OcTooltipLabel
						htmlFor={labelFor}
						required={required}
						description={description}
					>
						{label}
					</OcTooltipLabel>
				</div>
			)}
			<div className="form__field-input">
				{children}
			</div>
			{error && <OcError message={error} />}
		</>
	);
}

const FormGroupWrapper = (props: any) => {
	const formik = useFormikContext();
	const { error, touched } = formik.getFieldMeta(props.name);

	return (
		<div className="form__field">
			<FormGroup {...props} error={touched && !!error && error} />
		</div>
	)
}

export const RecursiveContainer: any = ({ fields, initialValues }) => {
	const builder = (element) => {
		const {
			id,
			label,
			description,
			type,
			name,
			attributes,
			// options,
			// subFieldDefinitions,
			// fields,
			placeholder,
			// category,
		} = element;

		switch (type) {
			case FIELD_TYPE.TEXT:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							name={name}
							as={OcInputComponent}
							placeholder={placeholder}
							required={attributes.required}
							id={id}
							inputType="text"
						/>
					</FormGroupWrapper>
				);
			case 'number':
				return (
					'number input'
				)
			case FIELD_TYPE.COLOR:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							name={name}
							component={FormikFieldWrapper}
							placeholder={placeholder}
							id={id}
							{...attributes}
						/>
					</FormGroupWrapper>
				)
			case FIELD_TYPE.DYNAMIC_FIELD_ARRAY:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<OcDynamicFieldArray element={element} fields={element.fields} initialValues={initialValues} />
					</FormGroupWrapper>
				);
			default:
				return <div>Unsupported field</div>
		}
	}

	return (
		fields.map(builder)
	);
}

export const OcForm: React.FC<any> = (props) => {
	const { data } = props;

	const onSubmit = React.useCallback((...args) => {
		console.log('args', ...args)
	}, []);

	const { initialValues, fields } = getValidParams(formJsonData.fields);

	const formik = useFormik({
		// initialValues,
		initialValues: {},
		onSubmit,
		// validationSchema,
		// ...props,
	});

	return (
		<FormikContext.Provider value={formik}>
			<FormikForm className="form">
				<RecursiveContainer fields={fields} initialValues={initialValues} />
			</FormikForm>
		</FormikContext.Provider>
	)
}
