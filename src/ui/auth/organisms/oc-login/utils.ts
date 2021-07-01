import { errorMessages } from '../../../form';
import {FormikValues} from 'formik';

export const validateLogin = (values: FormikValues) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = errorMessages.required();
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = errorMessages.email();
  }
  if (!values.password) {
    errors.password = errorMessages.required;
  }

  return errors;
};

export const onActivationLinkClick = (email: string): void => {
  alert(`Email to ${email} has been successfully sent`)
}
