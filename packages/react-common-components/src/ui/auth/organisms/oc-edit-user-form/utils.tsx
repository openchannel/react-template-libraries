import * as React from 'react';
import { nanoid } from 'nanoid';
import { Field } from 'formik';
import {
	FieldGroupWrapper,
	FormikField,
} from '@openchannel/react-common-components/src/ui/form/index';
import { OcInputComponent, OcPasswordComponent } from '@openchannel/react-common-components';

import { OcEditUserFormConfig } from './types';
const conditions = /[\.\s\-]/gm;

export const configConverter = (
	item: OcEditUserFormConfig,
	enablePasswordField: boolean,
	enableTermsCheckbox: boolean,
) => {
	const fieldsSorting = (field1: { id: string }, field2: { id: string }) => {
		const index1 = item.fieldsOrder!.indexOf(field1.id);
		const index2 = item.fieldsOrder!.indexOf(field2.id);
		return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
	};
	let newFormConfig = {
		formId: nanoid(),
		name: item.name,
		created: new Date(),
		fields: [
			...item.account.typeData.fields!.filter((field: any) =>
				item.account.includeFields.includes(field.id),
			),
			...item.organization.typeData.fields!.filter((field: any) =>
				item.organization.includeFields.includes(field.id),
			),
		],
	};
	if (item.fieldsOrder) {
		newFormConfig.fields.sort(fieldsSorting);
	}
	if (enablePasswordField) {
		const passwordField = {
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Password',
			attributes: { required: true },
		};
		newFormConfig.fields.push(passwordField);
	}
	if (enableTermsCheckbox) {
		const checkboxField = {
			id: 'terms',
			name: 'terms',
			type: 'checkbox',
			attributes: { required: true },
		};
		newFormConfig.fields.push(checkboxField);
	}
	newFormConfig.fields.map((field) => {
		field.description = '';
		field.name = field.id.replace(conditions, '');
		field.placeholder = '';
	});
	return newFormConfig;
};

export const FormikSignupFieldWrapper: React.FC<FormikField> = (field) => {
	const { id, label, description, name, attributes, placeholder } = field;

	return (
		<FieldGroupWrapper
			name={name}
			label={label}
			labelFor={id}
			description={description}
			required={attributes!.required}
		>
			<Field
				name={name}
				as={field.name === 'password' ? OcPasswordComponent : OcInputComponent}
				placeholder={placeholder}
				id={id}
				inputType="text"
			/>
		</FieldGroupWrapper>
	);
};
