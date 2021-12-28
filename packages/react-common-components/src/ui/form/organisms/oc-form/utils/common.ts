import * as React from 'react';
import type { FormikErrors, FormikValues } from 'formik';
import { isEmpty } from 'lodash-es';

import { errorMessages, FIELD_TYPE } from '../../../lib';
import type { FieldValidators, FormikField, FormikFieldsValues } from '../../../models';

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

/**
 * Validate each value by function validator
 *
 * @param prevValues
 * @param prevErrors
 * @param values Object
 * @param validators array of functions
 */
export const validateOcFormValues = (
	prevValues: FormikValues,
	prevErrors: FormikErrors<FormikValues>,
	values: FormikFieldsValues,
	validators: FieldValidators,
) => {
	if (!values || isEmpty(validators)) {
		return {};
	}

	return Object.entries(values).reduce((acc, [name, value]) => {
		/**
		 * TODO: uncomment if will get some bugs with displaying server errors
		 * TODO: fix render errors with oc-file-upload input when code below is necessary
		 *  */
		// value wasn't changed, set old error if present
		// if (value === prevValues[name] && prevErrors[name] != null) {
		// 	return { ...acc, [name]: prevErrors[name] };
		// }

		// no validator
		if (!validators[name] || validators[name]?.length === 0) {
			return acc;
		}

		// validate
		const errors = validators[name]!.map((validate) => validate(value))
			.filter(Boolean)
			.map((error) => errorMessages[error!.key](error!.value));
		if (errors.length === 0) {
			return acc;
		}

		return { ...acc, [name]: errors };
	}, {});
};

export const formatOcFormValues = (arr: FormikField[], values: FormikValues): Record<string, any> =>
	formatOcFormFields(arr, values, ['name', 'id']);

export const formatOcFormErrors = (
	arr: FormikField[],
	errors: FormikErrors<FormikValues>,
): Record<string, any> => formatOcFormFields(arr, errors, ['id', 'name']);

const formatOcFormFields = (
	arr: FormikField[],
	values: FormikValues,
	[source, target]: ('id' | 'name')[],
): Record<string, any> => {
	return arr.reduce((acc, item) => {
		if (item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			if (!item.fields || item.fields.length === 0) {
				return acc;
			}

			const children = formatOcFormValues(item.fields, values);
			const curr = acc[item[target]];
			return {
				...acc,
				[item[target]]: !isEmpty(children) ? [...(curr || []), { ...children }] : [...(curr || [])],
			};
		}

		const value = values[item[source]];
		if (value != null) {
			acc[item[target]] = value;
		}

		return acc;
	}, {} as Record<string, any>);
};

/**
 * Assign 'invalid' className to the customClass prop
 * @returns string
 */
export const customClassWithError = (error: string | undefined, child: React.ReactElement) => {
	if (!error) {
		return child.props.customClass;
	} else if (child.props.customClass != null) {
		return `${child.props.customClass} invalid`;
	} else {
		return 'invalid';
	}
};

/**
 * Find default form type by config name
 * @param options
 * @param defaultFormType
 */
export const getDefaultFormType = (options: { label: string }[], defaultFormType?: string) => {
	if (!defaultFormType) {
		return options[0];
	}

	const defaultOption = options.find((item) => item.label === defaultFormType);

	if (!defaultOption) {
		console.error(`OcForm Error. ${defaultFormType} is wrong config name!`);
		return options[0];
	}

	return defaultOption;
};
