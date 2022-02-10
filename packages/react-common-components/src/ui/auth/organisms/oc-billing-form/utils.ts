import { FormikValues } from 'formik';

import { errorMessages } from '../../../form';

const notADigit = /^[-]?\d*\.?\d*$/;

export const validateCreditCard = (values: FormikValues) => {
	const errors: any = {};

	if (!values.name) {
		errors.name = errorMessages.required();
	}
	// if (!values.card_number) {
	// 	errors.card_number = errorMessages.required();
	// }
	// if (!values.expiration) {
	// 	errors.expiration = errorMessages.required();
	// }
	// if (!values.cvc) {
	// 	errors.cvc = errorMessages.required();
	// }

	return errors;
};

export const validateAddress = (values: FormikValues) => {
	const errors: any = {};

	if (!values.address_line1) {
		errors.address_line1 = errorMessages.required();
	}
	if (!values.address_country) {
		errors.address_country = errorMessages.required();
	}
	if (!values.address_state) {
		errors.address_state = errorMessages.required();
	}
	if (!values.address_city) {
		errors.address_city = errorMessages.required();
	}
	if (!values.address_zip) {
		errors.address_zip = errorMessages.required();
	}

	return errors;
};

export const handleCardNumberChange = (e: any, handleChange: any) => {
	if (e.target.value.match(notADigit) === null) {
		e.preventDefault();
	} else {
		insertMask(e, handleChange);
	}
};
const insertMask = (e: any, handleChange: any) => {
	if (e.target.value.length % 4 == 0) {
		console.log('%%% 4', e);

		const copyEvent = e;
		copyEvent.target.value = copyEvent.target.value.concat(' ');
		handleChange(copyEvent);
	}
	if (e.target.value.length === 19) {
		console.log('length 19', e);

		const copyEvent = e;
		const maskedValue = e.target.value.replace(/(\d{4}\s)/g, '•••• •••• ••••');
		copyEvent.target.value = maskedValue;
		handleChange(copyEvent);
	}
};

/* 
1. check to have only numbers
2. check only 4th digit, and place spaces 
3. after 16 digits + 3 spaces reached replace digits with mask
 */
