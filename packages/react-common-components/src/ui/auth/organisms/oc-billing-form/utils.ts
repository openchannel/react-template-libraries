import { FormikValues } from 'formik';

import { errorMessages } from '../../../form';

export const validateCreditCard = (values: FormikValues) => {
	const errors: any = {};

	if (!values.name) {
		errors.name = errorMessages.required();
	}

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
