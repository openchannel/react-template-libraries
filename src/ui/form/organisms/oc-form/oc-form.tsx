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

import { AppFormModel } from './types';
import { getValidParams } from './utils';

import './style.scss';


const formJsonData: AppFormModel = {
	"createdDate": 1612464314950,
	"appTypeId": "dynamic-field_array",
	"description": "",
	"label": "dynamic-field_array",
	"fields": [
		{
			"attributes": {
				"required": true
			},
			"id": "name",
			"label": "Name",
			"type": "text"
		},
		{
			"defaultValue": "aaaa",
			"description": "",
			"attributes": {
				"maxChars": null,
				"required": null,
				"minChars": null
			},
			"id": "customData.test-first",
			"label": "test-first",
			"type": "longText"
		},
		{
			"description": "",
			"attributes": {
				"ordering": "append",
				"minCount": null,
				"rowLabel": null,
				"maxCount": null,
				"required": null
			},
			"id": "customData.fileds-fileds",
			"label": "fileds fileds",
			"type": "dynamicFieldArray",
			"fields": [
				{
					"attributes": {
						"maxChars": null,
						"required": null,
						"minChars": null
					},
					"id": "number",
					"label": "number",
					"type": "text"
				},
				{
					"attributes": {
						"ordering": null,
						"minCount": null,
						"rowLabel": null,
						"maxCount": null,
						"required": null
					},
					"id": "",
					"label": "",
					"type": "dynamicFieldArray",
					"fields": [
						{
							"attributes": {
								"required": null
							},
							"id": "aaaaa",
							"label": "aaaaa",
							"type": "emailAddress"
						},
						{
							"attributes": {
								"required": null
							},
							"id": "date-time",
							"label": "date-time",
							"type": "datetime"
						},
						{
							"attributes": {
								"ordering": null,
								"minCount": null,
								"rowLabel": null,
								"maxCount": null,
								"required": null
							},
							"id": "",
							"label": "",
							"type": "dynamicFieldArray",
							"fields": [
								{
									"defaultValue": [],
									"attributes": {
										"minCount": null,
										"maxCount": null,
										"required": null
									},
									"id": "boolean-tags",
									"label": "boolean-tags",
									"type": "booleanTags"
								}
							]
						}
					]
				}
			]
		},
		{
			"description": "",
			"attributes": {
				"required": null
			},
			"id": "customData.check-box",
			"label": "check-box",
			"type": "checkbox"
		}
	]
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
				<OcTooltipLabel htmlFor={labelFor} required={required} description={description}>
					{label}
				</OcTooltipLabel>
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

const RecursiveContainer: any = ({ fields, formik }) => {
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
			case 'text':
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
			case 'color':
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
			case 'dynamicFieldArray':
				return (
					<RecursiveContainer fields={element.fields || []} formik={formik} />
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
		initialValues,
		onSubmit,
		// validationSchema,
		...props,
	});

	return (
		<FormikContext.Provider value={formik}>
			<FormikForm className="form">
				<RecursiveContainer fields={fields} formik={formik} />
			</FormikForm>
		</FormikContext.Provider>
	)
}
