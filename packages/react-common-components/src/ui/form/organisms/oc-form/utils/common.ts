import type { FormikValues } from 'formik';
import { isEmpty } from 'lodash-es';

import { errorMessages, FIELD_TYPE } from '../../../lib';
import type { FieldValidators, FormikField, FormikFieldsValues } from '../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getOcFormButtonsClass = (buttonPosition: string): string => {
	switch (buttonPosition) {
		case 'center':
			return 'form__buttons form__buttons_justify_center';
		case 'left':
			return 'form__buttons form__buttons_justify_start';
		case 'between':
			return 'form__buttons form__buttons_justify_space-between form__buttons_direction_row_reverse';
		default:
			return 'form__buttons form__buttons_justify_start form__buttons_direction_row_reverse';
	}
};

export const validateOcFormValues = (values: FormikFieldsValues, validators: FieldValidators) => {
	if (!values || isEmpty(validators)) return {};

	return Object.entries(values).reduce((acc, [name, value]) => {
		if (!validators[name] || validators[name]?.length === 0) return acc;

		const errors = validators[name]!.map((validate) => validate(value))
			.filter(Boolean)
			.map((error) => errorMessages[error!.key](error!.value));

		if (errors.length === 0) return acc;

		return { ...acc, [name]: errors };
	}, {});
};

export const formatOcFormValues = (
	arr: FormikField[],
	values: FormikValues,
): Record<string, any> => {
	return arr.reduce((acc, item) => {
		if (item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			if (!item.fields || item.fields.length === 0) {
				return acc;
			}

			const children = formatOcFormValues(item.fields, values);
			const curr = acc[item.id];
			return {
				...acc,
				[item.id]: !isEmpty(children) ? [...(curr || []), { ...children }] : [...(curr || [])],
			};
		}

		const isValueExist = values[item.name];
		if (isValueExist) {
			acc[item.id] = isValueExist;
		}

		return acc;
	}, {} as Record<string, any>);
};
