import isNil from 'lodash/isNil';

import { stripHtmlTags } from '../../../lib';
import { FieldValidators, FormikField, ValidatorFn } from '../models';

import { FIELD_TYPE } from './constants';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%!^&]).{8,}$/;
const EMAIL_REGEX = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const isEmptyInputValue = (value: any) => value == null || value.length === 0;

const hasValidLength = (value: any) => value != null && typeof value.length === 'number';

const requiredTrue = () => (value: boolean) => (value ? null : { key: 'required', value: true });

const required = () => (value: any) =>
	isEmptyInputValue(value) ? { key: 'required', value: true } : null;

const maxLength = (maxLength: number) => (value: any) => {
	return hasValidLength(value) && value.length > maxLength
		? { key: 'maxlength', value: { requiredLength: maxLength, actualLength: value.length } }
		: null;
};

const minLength = (minLength: number) => (value: any) => {
	if (isEmptyInputValue(value) || !hasValidLength(value)) {
		return null;
	}

	return value.length < minLength
		? { key: 'minlength', value: { requiredLength: minLength, actualLength: value.length } }
		: null;
};

const min = (min: number) => (value: any) => {
	if (isEmptyInputValue(value) || isEmptyInputValue(min)) {
		return null;
	}

	const parsedValue = parseFloat(value);

	return !isNaN(value) && value < min ? { key: 'min', value: { min, actual: parsedValue } } : null;
};

const max = (max: number) => (value: any) => {
	if (isEmptyInputValue(value) || isEmptyInputValue(max)) {
		return null;
	}

	const parsedValue = parseFloat(value);

	return !isNaN(value) && value > max ? { key: 'max', value: { max, actual: parsedValue } } : null;
};

const email = () => (value: string) => {
	if (isEmptyInputValue(value)) {
		return null;
	}

	return EMAIL_REGEX.test(value) ? null : { key: 'email', value: true };
};

const url = () => (value: string) => {
	// eslint-disable-next-line
	const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

	if (URL_REGEX.test(value) || value === '') {
		return null;
	}

	return { key: 'url', value: true };
};

const color = () => (value: string) => {
	if ((value.charAt(0) === '#' && value.length === 7) || value === '') {
		return null;
	}

	return { key: 'color', value: true };
};

const password = () => (value: string) => {
	if ((value ? value : '').match(PASSWORD_REGEX)) {
		return null;
	}

	return { key: 'password', value: {} };
};

const minLengthArray = (min: number, label: string, showLengthErrorText?: boolean) => (
	value: any[],
) => {
	if (!value || value.length === 0 || value.length >= min) {
		return null;
	}

	return showLengthErrorText
		? { key: 'minElementsCount', value: { requiredCount: min, fieldLabel: label } }
		: { key: 'minCount', value: true };
};

const maxLengthArray = (max: number, label: string, showLengthErrorText?: boolean) => (
	value: any[],
) => {
	if (!value || value.length === 0 || value.length <= max) {
		return null;
	}

	return showLengthErrorText
		? { key: 'maxElementsCount', value: { requiredCount: max, fieldLabel: label } }
		: { key: 'maxCount', value: true };
};

const richTextMinCharacters = (min: number) => (value: string) => {
	const characters = stripHtmlTags(value);

	return characters.length >= min ? null : { key: 'minlength', value: { requiredLength: min } };
};

const richTextMaxCharacters = (max: number) => (value: string) => {
	const characters = stripHtmlTags(value);

	return characters.length <= max ? null : { key: 'maxlength', value: { requiredLength: max } };
};

// const fillArrayForNumberTags = (maxCount: number): number[] => {
// 	return Array.from({ length: maxCount }, (_, i) => i + 1);
// };

const numberTags = (label: string) => (value: number[]) => {
	const numberArray = value;

	if (numberArray) {
		for (const numberItem of numberArray) {
			if (isNaN(Number(numberItem))) {
				return { key: 'numberTags', value: { fieldTitle: label } };
			}
		}
		return null;
	}

	return null;
};

const booleanTags = (label: string) => (value: boolean[]) => {
	const booleanAcceptedValues = new Set([true, false]);
	const booleanArray = value;

	if (booleanArray) {
		for (const booleanItem of booleanArray) {
			if (!booleanAcceptedValues.has(booleanItem)) {
				return { key: 'booleanTags', value: { fieldTitle: label } };
			}
		}
		return null;
	}

	return null;
};

export const setUpFieldValidators = (
	{ attributes, label }: FormikField,
	type?: { [k: string]: boolean },
): ValidatorFn[] => {
	if (!attributes) return [];

	const {
		isCheckbox = false,
		isEmail = false,
		isUrl = false,
		isColor = false,
		isList = false,
		isRichText = false,
		isPassword = false,
		isBooleanTags = false,
		isNumberTags = false,
	} = type || {};

	return Object.keys(attributes)
		.reduce((acc, key) => {
			if (isNil(attributes[key])) return acc;

			switch (key) {
				case 'required':
					if (!attributes[key]) {
						break;
					} else if (isCheckbox) {
						acc.push(requiredTrue());
					} else {
					 acc.push(required());
					}
					break;
				case 'maxChars':
					if (isRichText) {
						acc.push(richTextMaxCharacters(Number(attributes[key])));
					} else {
						acc.push(maxLength(Number(attributes[key])));
					}
					break;
				case 'minChars':
					if (isRichText) {
						acc.push(richTextMinCharacters(Number(attributes[key])));
					} else {
						acc.push(minLength(Number(attributes[key])));
					}
					break;
				case 'minCount':
					acc.push(minLengthArray(Number(attributes[key]), label, isList));
					break;
				case 'maxCount':
					acc.push(maxLengthArray(Number(attributes[key]), label, isList));
					break;
				case 'min':
					acc.push(min(Number(attributes[key])));
					break;
				case 'max':
					acc.push(max(Number(attributes[key])));
					break;
				default:
					break;
			}

			if (isEmail) {
				acc.push(email());
			}
			if (isUrl) {
				acc.push(url());
			}
			if (isColor) {
				acc.push(color());
			}
			if (isPassword) {
				acc.push(password());
			}
			if (isNumberTags) {
				acc.push(numberTags(label));
			}
			if (isBooleanTags) {
				acc.push(booleanTags(label));
			}

			return acc;
		}, [] as ValidatorFn[])
		.filter(Boolean);
};

export const getFieldValidators = (field: FormikField): FieldValidators => {
	let validators: ValidatorFn[] = [];

	switch (field.type) {
		case FIELD_TYPE.DATE:
		case FIELD_TYPE.DATE_TIME:
		case FIELD_TYPE.MULTISELECT_LIST:
		case FIELD_TYPE.DYNAMIC_FIELD_ARRAY:
		case FIELD_TYPE.TEXT:
		case FIELD_TYPE.LONG_TEXT:
		case FIELD_TYPE.DROPDOWN_LIST:
			validators = setUpFieldValidators(field);
			break;
		case FIELD_TYPE.CHECKBOX:
			validators = setUpFieldValidators(field, { isCheckbox: true });
			break;
		case FIELD_TYPE.EMAIL_ADDRESS:
			validators = setUpFieldValidators(field, { isEmail: true });
			break;
		case FIELD_TYPE.VIDEO_URL:
		case FIELD_TYPE.WEBSITE_URL:
			validators = setUpFieldValidators(field, { isUrl: true });
			break;
		case FIELD_TYPE.COLOR:
			validators = setUpFieldValidators(field, { isColor: true });
			break;
		case FIELD_TYPE.PASSWORD:
			validators = setUpFieldValidators(field, { isPassword: true });
			break;
		case FIELD_TYPE.RICH_TEXT:
			validators = setUpFieldValidators(field, { isRichText: true });
			break;
		case FIELD_TYPE.TAGS:
			validators = setUpFieldValidators(field, { isList: true });
			break;
		case FIELD_TYPE.SINGLE_FILE:
		case FIELD_TYPE.MULTI_FILE:
		case FIELD_TYPE.MULTI_IMAGE:
		case FIELD_TYPE.SINGLE_IMAGE:
		case FIELD_TYPE.PRIVATE_SINGLE_FILE:
		case FIELD_TYPE.MULTI_PRIVATE_FILE:
			validators = setUpFieldValidators(field, { isList: true });
			break;
		case FIELD_TYPE.BOOLEAN_TAGS:
			validators = setUpFieldValidators(field, { isList: true, isBooleanTags: true });
			break;
		case FIELD_TYPE.NUMBER_TAGS:
			validators = setUpFieldValidators(field, { isList: true, isNumberTags: true });
			break;
		default:
			break;
	}

	return { [field.name]: validators };
};
