import { nanoid } from 'nanoid';

import type { OcEditUserFormConfig, OcEditUserTypeConfig } from './types';

const filterFields = (config?: OcEditUserTypeConfig) => {
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
			...filterFields(item.account),
			...filterFields(item.organization),
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
