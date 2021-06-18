import * as React from 'react';
import { Field } from 'formik';
import _ from 'lodash';

import {
	OcCheckboxComponent,
	OcInputComponent,
	OcNumberComponent,
	OcPasswordComponent,
} from '../../../../common';
import { FIELD_TYPE } from '../../../lib';
import { OcDynamicFieldArray } from '../../oc-dynamic-field-array';
import { useOcFormContext } from '../context';
import { FormikMapFieldsProps } from '../types';

import {
	FieldGroupWrapper,
	FormikOcColoWrapper,
	FormikOcDatetimePickerWrapper,
	FormikOcMultiSelectListWrapper,
	FormikOcSelectWrapper,
	FormikOcTagsWrapper,
	FormikOcVideoUrlWrapper,
	FormikRichTextWrapper,
} from './formik-components';

export const FormikMapFields: React.FC<FormikMapFieldsProps> = ({ fields }) => {
	if (!fields || fields.length === 0) {
		return null;
	}

	return (
		<>
			{fields.map((field, index) => {
				const { id, label, description, type, name, attributes, options, placeholder } = field;

				switch (type) {
					case FIELD_TYPE.RICH_TEXT:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field name={name} component={FormikRichTextWrapper} placeholder={placeholder} />
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.TEXT:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									as={OcInputComponent}
									placeholder={placeholder}
									required={attributes!.required}
									id={id}
									inputType="text"
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.DROPDOWN_LIST:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									component={FormikOcSelectWrapper}
									placeholder={placeholder}
									required={attributes!.required}
									options={options}
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.NUMBER:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									as={OcNumberComponent}
									placeholder={placeholder}
									required={attributes!.required}
									id={id}
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.CHECKBOX:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									as={OcCheckboxComponent}
									required={attributes!.required}
									labelText={label}
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.EMAIL_ADDRESS:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									as={OcInputComponent}
									placeholder={placeholder || 'myemail@example.com'}
									required={attributes!.required}
									inputType="email"
									id={id}
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.WEBSITE_URL:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									as={OcInputComponent}
									placeholder={placeholder || 'https://my.website.com'}
									required={attributes!.required}
									inputType="url"
									id={id}
								/>
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.COLOR:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field
									name={name}
									component={FormikOcColoWrapper}
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
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
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
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
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
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field id={id} name={name} component={FormikOcDatetimePickerWrapper} type={type} />
							</FieldGroupWrapper>
						);
					case FIELD_TYPE.MULTISELECT_LIST:
						return (
							<FieldGroupWrapper
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
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
								key={name}
								name={name}
								label={label}
								labelFor={id}
								description={description}
								required={attributes!.required}
							>
								<Field name={name} as={OcPasswordComponent} />
							</FieldGroupWrapper>
						);
					// case FIELD_TYPE.PASSWORD:
					// 	return (
					// 		<FieldGroupWrapper
					// 			key={name}
					// 			name={name}
					// 			label={label}
					// 			labelFor={id}
					// 			description={description}
					// 			required={attributes!.required}
					// 		>
					// 			<Field name={name} as={OcPasswordComponent} />
					// 		</FieldGroupWrapper>
					// 	);
					case FIELD_TYPE.DYNAMIC_FIELD_ARRAY: {
						const group = _.groupBy(fields, 'type')[FIELD_TYPE.DYNAMIC_FIELD_ARRAY];
						const firstElementOfGroup = group[0] || { fields: [] };
						const isFirst =
							firstElementOfGroup?.fields?.length === 0 ||
							firstElementOfGroup.index === fields[index].index;
						const groupFieldIndex = group.findIndex((g) => g.index === index);

						// render label only for first element of this type
						if (isFirst) {
							return (
								<FieldGroupWrapper
									key={name}
									name={name}
									label={label}
									labelFor={id}
									description={description}
									required={attributes!.required}
								>
									<OcDynamicFieldArray
										field={field}
										groupFieldIndex={groupFieldIndex}
										showAddButton={fields.length === 0 || fields.length === index + 1}
									/>
								</FieldGroupWrapper>
							);
						}
						return (
							<OcDynamicFieldArray
								key={name}
								field={field}
								groupFieldIndex={groupFieldIndex}
								showAddButton={fields.length === 0 || fields.length === index + 1}
							/>
						);
					}
					default:
						return <div key={index}>Unsupported field</div>;
				}
			})}
		</>
	);
};

export const FormikMapFieldsWrapper = () => {
	const context = useOcFormContext();

	return <FormikMapFields fields={context.fields} />;
};
