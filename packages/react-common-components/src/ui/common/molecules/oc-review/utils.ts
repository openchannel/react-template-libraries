import { FormikValues } from 'formik';

import { errorMessages } from '../../../form';

export const validateReview = (values: FormikValues) => {
	const errors: any = {};

	if (!values.rating) {
		errors.rating = errorMessages.required();
	}

	if (!values.headline) {
		errors.headline = errorMessages.required();
	}

	if (!values.description) {
		errors.description = errorMessages.required();
	}

	return errors;
};
