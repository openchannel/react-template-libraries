import isEmpty from 'lodash/isEmpty';

import { errorMessages } from '../../../lib';
import { FormikFieldsValues, FieldValidators } from '../../../models';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

export const getOcFormButtonsClass = (buttonPosition: string): string => {
	switch (buttonPosition) {
		case 'center':
			return 'form__buttons form__buttons_justify_center';
		case 'left':
			return 'form__buttons form__buttons_justify_start';
		default:
			return 'form__buttons form__buttons_justify_start form__buttons_direction_row_reverse';
	}
};

export const validateOcFormValues = (values: FormikFieldsValues, validators: FieldValidators) => {
	if (!values || isEmpty(validators)) return {};

	return Object.entries(values)
	.reduce((acc, [name, value]) => {
		if (!validators[name] || validators[name]?.length === 0) return acc;

		return {
			...acc,
			[name]: validators[name]!
			.map((validate) => validate(value))
			.filter(Boolean)
			.map((error) => errorMessages[error!.key](error!.value)),
		};
	}, {});
};
