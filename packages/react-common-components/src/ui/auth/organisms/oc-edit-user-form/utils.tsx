import * as React from 'react';
import { Field } from 'formik';
import { nanoid } from 'nanoid';

import OcInputComponent from '../../../common/atoms/oc-input/oc-input';
import OcPasswordComponent from '../../../common/atoms/oc-password/oc-password';
import type { FormikField } from '../../../form/models';
import { FieldGroupWrapper } from '../../../form/organisms/oc-form';

import type { OcEditUserFormConfig, OcEditUserTypeConfig } from './types';

const filterFields = (type: 'account' | 'organization', config?: OcEditUserTypeConfig) => {
	if (!config || !config.typeData.fields) {
		return [];
	} else if (!config.includeFields || config.includeFields.length === 0) {
		return config.typeData.fields;
	}

	const includeFields = new Set([...config.includeFields]);

	return config.typeData.fields.filter((field) => includeFields.has(field.id));
};

const fieldsSorting = (config: OcEditUserFormConfig) => (field1: { id: string }, field2: { id: string }) => {
	const index1 = config.fieldsOrder!.indexOf(field1.id);
	const index2 = config.fieldsOrder!.indexOf(field2.id);
	return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
};

export const configConverter = (
	item: OcEditUserFormConfig,
	enablePasswordField: boolean,
	enableTermsCheckbox: boolean,
) => {
	const newFormConfig = {
		formId: nanoid(),
		name: item.name,
		created: new Date(),
		fields: [
			...filterFields('account', item.account),
			...filterFields('organization', item.organization),
		],
	};

	if (item.fieldsOrder) {
		newFormConfig.fields.sort(fieldsSorting(item));
	}

	if (enablePasswordField) {
		newFormConfig.fields.push({
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Password',
			defaultValue: '',
			attributes: { required: false },
		});
	}

	if (enableTermsCheckbox) {
		newFormConfig.fields.push({
			id: 'terms',
			name: 'terms',
			type: 'checkbox',
			defaultValue: false,
			attributes: { required: true },
		});
	}

	newFormConfig.fields.forEach((field) => {
		field.description = '';
		field.name = field.id;
		field.placeholder = '';
	});

	return newFormConfig;
};

export const EditUserFormFieldWrapper: React.FC<FormikField> = (field) => {
	const { id, label, description, attributes, placeholder } = field;

	// avoid formik nesting,
	// e.g., if name = 'a.b', it will remain as {'a.b': ...}, not as {a: {b: ...}
	const name = `['${field.name}']`;

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
				as={name === 'password' ? OcPasswordComponent : OcInputComponent}
				placeholder={placeholder}
				id={id}
				inputType={name === 'password' ? undefined : name === 'email' ? 'email' : 'text'}
			/>
		</FieldGroupWrapper>
	);
};
