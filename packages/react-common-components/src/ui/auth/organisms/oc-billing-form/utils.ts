import { FormikValues } from 'formik';

import { errorMessages } from '../../../form';

export const validateCreditCard = (values: FormikValues) => {
	const errors: any = {};

	if (!values.name) {
		errors.name = errorMessages.required();
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.name = errorMessages.email();
	}
	if (!values.card_number) {
		errors.card_number = errorMessages.required();
	}
	if (!values.expiration) {
		errors.expiration = errorMessages.required();
	}
	if (!values.cvc) {
		errors.cvc = errorMessages.required();
	}

	return errors;
};

export const validateAddress = (values: FormikValues) => {
	const errors: any = {};

	if (!values.address_line1) {
		errors.address_line1 = errorMessages.required();
	}
	if (!values.address_line2) {
		errors.address_line2 = errorMessages.required();
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

export const handleCardNumberChange = (e: React.ChangeEvent) => {};

/* export const onActivationLinkClick = (email: string): void => {
	alert(`Email to ${email} has been successfully sent`);
}; */
