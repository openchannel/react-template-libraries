import { nanoid } from 'nanoid';
import {
	OcEditUserFormConfig,
	OcEditUserTypeConfig
} from '../../../../auth/organisms/oc-edit-user-form';
import { AppFormModel } from '../../../models';

/**
 * return only those fields that are included in 'includeFields' in the config
 * @param config
 */
const filterFields = (config?: OcEditUserTypeConfig) => {
	if (!config || !config.typeData.fields) {
		return [];
	} else if (!config.includeFields || config.includeFields.length === 0) {
		return config.typeData.fields;
	}

	const includeFields = new Set([...config.includeFields]);

	return config.typeData.fields.filter((field) => includeFields.has(field.id));
};

/**
 * sort fields by 'fieldsOrder'
 * @param config
 */
const fieldsSorting =
	(config: OcEditUserFormConfig) => (field1: { id: string }, field2: { id: string }) => {
		const index1 = config.fieldsOrder!.indexOf(field1.id);
		const index2 = config.fieldsOrder!.indexOf(field2.id);
		return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
	};

const mapConfig = (
	config: OcEditUserFormConfig,
	enablePasswordField: boolean,
	enableTermsCheckbox: boolean,
) => {
	const formConfig = {
		formId: nanoid(),
		name: config.name,
		created: Date.now(),
		fields: [...filterFields(config.account), ...filterFields(config.organization)],
	};

	if (config.fieldsOrder) {
		formConfig.fields!.sort(fieldsSorting(config));
	}

	if (enablePasswordField) {
		formConfig.fields.push({
			id: 'password',
			name: 'password',
			type: 'password',
			label: 'Password',
			attributes: { required: true },
		});
	}

	if (enableTermsCheckbox) {
		formConfig.fields.push({
			id: 'terms',
			name: 'terms',
			type: 'checkbox',
			defaultValue: false,
			attributes: { required: true },
		});
	}

	formConfig.fields.forEach((field) => {
		field.name = field.id;
	});

	return formConfig as AppFormModel;
};

export const mapConfigsToFormConfigs = (
	formConfigs: OcEditUserFormConfig[],
	enablePasswordField: boolean,
	enableTermsCheckbox: boolean,
): AppFormModel[] => {
	return formConfigs.map((config) => mapConfig(config, enablePasswordField, enableTermsCheckbox));
}

export const mapFormTypes = (formConfigs: OcEditUserFormConfig[]) => {
	let result: { options: { label: string; }[]; types: { label: string; value: string | undefined; }[] } = { options: [], types: [] };

	for (const config of formConfigs) {
		result.options.push({ label: config.name });
		result.types.push({ label: config.name, value: config?.account?.type || config?.organization?.type });
	}

	return result;
}
