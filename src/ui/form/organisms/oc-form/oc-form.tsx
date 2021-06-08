import * as React from 'react';
import {
	useFormik,
	FormikContext,
	Form as FormikForm,
	Field,
} from 'formik';
import _ from 'lodash';

import {
	OcPasswordComponent,
	OcCheckboxComponent,
	OcNumberComponent,
	OcButtonComponent,
	OcInputComponent,
} from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';

import {
	FormikOcMultiSelectListWrapper,
	FormikOcDatetimePickerWrapper,
	FormikOcVideoUrlWrapper,
	FormikOcTagsWrapper,
	FormikFieldWrapper,
	FormikOcSelectWrapper,
	FieldGroupWrapper,
	FormikRichTextWrapper,
} from './formik-components';
import { useOcFormContext, OcFormContextProvider } from './context';

import './style.scss';

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
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.TEXT:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.DROPDOWN_LIST:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.NUMBER:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.CHECKBOX:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.EMAIL_ADDRESS:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.WEBSITE_URL:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.COLOR:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.TAGS:
			case FIELD_TYPE.BOOLEAN_TAGS:
			case FIELD_TYPE.NUMBER_TAGS:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.VIDEO_URL:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.DATE:
			case FIELD_TYPE.DATE_TIME:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.MULTISELECT_LIST:
				return (
					<FieldGroupWrapper
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
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.PASSWORD:
				return (
					<FieldGroupWrapper
						name={name}
						label={label}
						labelFor={id}
						description={description}
						required={attributes.required}
					>
						<Field name={name} as={OcPasswordComponent} />
					</FieldGroupWrapper>
				);
			case FIELD_TYPE.DYNAMIC_FIELD_ARRAY: {
				const group = _.groupBy(fields, 'type')[FIELD_TYPE.DYNAMIC_FIELD_ARRAY];
				const isFirst = group[0].fields.length === 0 || group[0].index === fields[index].index;
				const groupFieldIndex = group.findIndex((g) => g.index === index);

				// render label only for first element of this type
				if (isFirst) {
					return (
						<FieldGroupWrapper
							name={name}
							label={label}
							labelFor={id}
							description={description}
							required={attributes.required}
						>
						<OcDynamicFieldArray
							field={element}
							groupFieldIndex={groupFieldIndex}
							showAddButton={fields.length === 0 || fields.length === (index + 1)}
						/>
						</FieldGroupWrapper>
					);
				}
				return (
					<OcDynamicFieldArray
						field={element}
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
		<RecursiveContainer fields={context.fields} />
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
	const { data, onSubmit, successButtonText = 'Submit', buttonPosition = 'left' } = props;

	const formik = useFormik({
		initialValues: {},
		onSubmit,
	});

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ data }}>
				<FormikForm className="form">
					<RecursiveContainerWrapper />
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className="form__button">
							<OcButtonComponent htmlType="submit" type="primary">
								{successButtonText}
							</OcButtonComponent>
						</div>
						<div className="form__button">
							<OcButtonComponent htmlType="button" type="secondary">
								Cancel
							</OcButtonComponent>
						</div>
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	)
}
