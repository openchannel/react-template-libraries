import React from 'react';
import { FormikValues } from 'formik';

export interface BillingFormProps {
	hideCardFormElements: boolean;
	showStripeForm: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: (e: FormikValues) => void;
	successButtonText: string;
}
