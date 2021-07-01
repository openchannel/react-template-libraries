export const isDev = (): boolean => process.env.NODE_ENV === 'development';

export const isStorybook = (): boolean => process.env.STORYBOOK === 'true';

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

export const onActivationLinkClick = (email: string): void => {
  alert(`Email to ${email} has been successfully sent`)
}
