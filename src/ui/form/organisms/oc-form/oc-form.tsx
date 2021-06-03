import * as React from 'react';
import {
	useFormikContext,
	useFormik,
	FormikContext,
	Form as FormikForm,
	Field,
} from 'formik';
import merge from 'lodash/merge';

import { OcColorComponent, OcError, OcInputComponent } from '../../../common';
import { OcTooltipLabel } from '../../atoms';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';
import { useOcFormContext } from './context';

import { AppFormModel } from './types';
import { getValidParams } from './utils';
import { OcFormContextProvider } from './context';

import './style.scss';


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

export const RecursiveContainer: any = ({ fields }) => {
	const builder = (element, index) => {
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
						<OcDynamicFieldArray
							element={element}
							showAddButton={fields.length === 0 || fields.length === (index + 1)}
						/>
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

export const FieldDeterminant: any = (element) => {
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
					<OcDynamicFieldArray
						element={element}
						fields={element.fields}
					/>
				</FormGroupWrapper>
			);
		default:
			return <div>Unsupported field</div>
	}
};

const RecursiveContainerWrapper = () => {
	const context = useOcFormContext();

	return (
		<RecursiveContainer fields={context.fieldsDefinition} />
	)
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

	// console.log('fields', fields)
	console.log('formik.values', formik.values)

	return (
		<OcFormContextProvider initialValue={{ fields }}>
			<FormikContext.Provider value={formik}>
				<FormikForm className="form">
					<RecursiveContainerWrapper />
				</FormikForm>
			</FormikContext.Provider>
		</OcFormContextProvider>
	)
}
