import * as React from 'react';
import {
	useFormikContext,
	useFormik,
	FormikContext,
	Form as FormikForm,
	Field,
} from 'formik';
import _ from 'lodash';
import { OcPasswordComponent } from '../../../common';
import { OcVideoUrlComponent } from '../../../common';
import { OcCheckboxComponent } from '../../../common';
import { OcNumberComponent } from '../../../common';
import { OcButtonComponent } from '../../../common';

import { OcTooltipLabel } from '../../atoms';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';
import { OcInputComponent } from '../../../common';
import { FormikOcMultiSelectListWrapper } from './formik-components';
import { FormikOcDatetimePickerWrapper } from './formik-components';
import { FormikOcVideoUrlWrapper } from './formik-components';
import { FormikOcTagsWrapper } from './formik-components';
import { FormikFieldWrapper } from './formik-components';
import { FormikOcSelectWrapper } from './formik-components';
import { FormikRichTextWrapper } from './formik-components';
import { FormGroupWrapper } from './formik-components';
import { OcColorComponent, OcError, OcInputComponent } from '../../../common';

import { AppFormModel } from './types';
import { getValidParams } from './utils';
import { useOcFormContext, OcFormContextProvider } from './context';

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

export const RecursiveContainer: any = ({ fields }) => {
	const builder = (element, index) => {
		const {
			id,
			label,
			description,
			type,
			name,
			attributes,
			options,
			// subFieldDefinitions,
			// fields,
			placeholder,
			// category,
		} = element;

		switch (type) {
			case FIELD_TYPE.RICH_TEXT:
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
							component={FormikRichTextWrapper}
							placeholder={placeholder}
						/>
					</FormGroupWrapper>
				);
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
			case FIELD_TYPE.DROPDOWN_LIST:
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
							component={FormikOcSelectWrapper}
							placeholder={placeholder}
							required={attributes.required}
							options={options}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.NUMBER:
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
							as={OcNumberComponent}
							placeholder={placeholder}
							required={attributes.required}
							id={id}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.CHECKBOX:
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
							as={OcCheckboxComponent}
							placeholder={placeholder}
							required={attributes.required}
							// labelText={}
							id={id}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.EMAIL_ADDRESS:
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
							placeholder={placeholder || 'myemail@example.com'}
							required={attributes.required}
							inputType="email"
							id={id}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.WEBSITE_URL:
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
							placeholder={placeholder || 'https://my.website.com'}
							required={attributes.required}
							inputType="url"
							id={id}
						/>
					</FormGroupWrapper>
				);
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
				);
			case FIELD_TYPE.TAGS:
			case FIELD_TYPE.BOOLEAN_TAGS:
			case FIELD_TYPE.NUMBER_TAGS:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							id={id}
							name={name}
							component={FormikOcTagsWrapper}
							placeholder={placeholder}
							options={options}
							tagsType={
								type === FIELD_TYPE.BOOLEAN_TAGS
									? 'boolean'
									: type === FIELD_TYPE.NUMBER_TAGS
									? 'number'
									: 'string'
							}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.VIDEO_URL:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							id={id}
							name={name}
							component={FormikOcVideoUrlWrapper}
							placeholder={placeholder}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.DATE:
			case FIELD_TYPE.DATE_TIME:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							id={id}
							name={name}
							component={FormikOcDatetimePickerWrapper}
							type={type}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.MULTISELECT_LIST:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field
							id={id}
							name={name}
							component={FormikOcMultiSelectListWrapper}
							options={options}
							label={label}
						/>
					</FormGroupWrapper>
				);
			case FIELD_TYPE.PASSWORD:
				return (
					<FormGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field name={name} as={OcPasswordComponent} />
					</FormGroupWrapper>
				);
			case FIELD_TYPE.DYNAMIC_FIELD_ARRAY: {
				const group = _.groupBy(fields, 'type')[FIELD_TYPE.DYNAMIC_FIELD_ARRAY];
				const isFirst = group[0].fields.length === 0 || group[0].index === fields[index].index;

				const groupFieldIndex = group.findIndex((g) => g.index === index);

				// render label only for first element of this type
				if (isFirst) {
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
							groupFieldIndex={groupFieldIndex}
							showAddButton={fields.length === 0 || fields.length === (index + 1)}
						/>
						</FormGroupWrapper>
					);
				}
				return (
					<OcDynamicFieldArray
						element={element}
						groupFieldIndex={groupFieldIndex}
						showAddButton={fields.length === 0 || fields.length === (index + 1)}
					/>
				);
			}
			default:
				return <div>Unsupported field</div>
		}
	}

	return (
		fields.map(builder)
	);
}

const RecursiveContainerWrapper = () => {
	const context = useOcFormContext();

	return (
		<RecursiveContainer fields={context.fieldsDefinition} />
	)
}

const getOcFormButtonsClass = (buttonPosition: string): string => {
	switch (buttonPosition) {
		case 'center': return `form__buttons form__buttons_justify_center`;
		case 'left': return `form__buttons form__buttons_justify_start`;
		default: return `form__buttons form__buttons_justify_start form__buttons_direction_row_reverse`;
	}
};

export const OcForm: React.FC<any> = (props) => {
	const { data, successButtonText = 'Submit', buttonPosition = 'left' } = props;

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
	// console.log('formik.values', formik.values)

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ fields }}>
				<FormikForm className="form">
					<RecursiveContainerWrapper />
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className="form__button">
							<OcButtonComponent type="primary">
								{successButtonText}
							</OcButtonComponent>
						</div>
						<div className="form__button">
							<OcButtonComponent type="secondary">
								Cancel
							</OcButtonComponent>
						</div>
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	)
}
