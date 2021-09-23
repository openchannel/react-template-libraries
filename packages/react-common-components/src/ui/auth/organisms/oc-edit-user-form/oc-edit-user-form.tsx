import * as React from 'react';
import { Form, Formik, FormikValues, FormikErrors, FormikProps } from 'formik';

import { OcButtonComponent, OcCheckboxComponent, OcError } from '../../../common/atoms';
import { OcSelect, Option } from '../../../common/molecules';
import { FormikField } from '../../../form';
import { OcTooltipLabel } from '../../../form/atoms';
import { validateOcFormValues } from '../../../form/organisms/oc-form/utils/common';
import { fieldsUtils } from '../../../form/organisms/oc-form/utils/fields';

import { EditUserComponentProps } from './types';
import { configConverter, FormikSignupFieldWrapper } from './utils';

import './style.scss';

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		enableTypesDropdown = false,
		enablePasswordField = false,
		enableCustomTerms,
		customTermsDescription,
		ordinaryTermsDescription,
		enableTermsCheckbox = false,
		defaultTypeLabelText = 'Type',
		onSubmit,
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
		submitText = 'Submit',
	} = props;

	const formikRef = React.createRef<FormikProps<FormikValues>>();

	const formTypes: string[] = React.useMemo(
		() => formConfigs.map((config) => config.name),
		[formConfigs],
	);

	const [formType, setFormType] = React.useState<string | undefined>();

	React.useEffect(() => {
		if (!formType && formTypes.length > 0) {
			setFormType(formTypes[0]);
		}
	}, [formType, formTypes]);

	const dynamicFormFields: any[] = React.useMemo(
		() =>
			formConfigs
				?.map((item) => configConverter(item, enablePasswordField, enableTermsCheckbox))
				?.filter((config) => config.name === formType)[0]?.fields || [],
		[formConfigs, enablePasswordField, enableTermsCheckbox, formType],
	);

	const initialValues: { [key: string]: any } = React.useMemo(
		() =>
			dynamicFormFields.reduce((acc, field) => {
				acc[field.name] = field.defaultValue != null ? field.defaultValue : '';
				return acc;
			}, {}),
		[dynamicFormFields],
	);

	const handleFormTypeChange = React.useCallback(
		(formType:  string | Option) => {
			if (typeof formType === 'string') {
				setFormType(formType);
			} else {
				setFormType(formType.name);
			}
		},
		[setFormType],
	);

	const validate =  (values: FormikValues): void | object | Promise<FormikErrors<FormikValues>> => {
		const formik = formikRef.current;
		if (formik != null) {
			const validators = fieldsUtils.getValidators(dynamicFormFields?.length ? dynamicFormFields : []);
			return validateOcFormValues(formik.values, formik.errors, values, validators);
		}
	}

	if (formConfigs.length === 0) {
		return null;
	}

	return (
		<div className="edit-user-form">
			{!formConfigs.length && (
				<h6 className="edit-user-form__empty_form_configs">{defaultEmptyConfigsErrorMessage}</h6>
			)}
			{formConfigs?.length > 0 && (
				<div>
					{enableTypesDropdown && formConfigs?.length > 1 && (
						<>
							<OcTooltipLabel text={defaultTypeLabelText} labelClass="edit-user-form__type-label" />
							<OcSelect
								selectValArr={formTypes}
								onSelectionChange={handleFormTypeChange}
								labelField="name"
								value={formType}
							/>
						</>
					)}
					<Formik
						innerRef={formikRef}
						initialValues={initialValues}
						onSubmit={onSubmit}
						validate={validate}
						enableReinitialize
						noValidate
					>
						{({ handleSubmit, handleChange, values, errors, handleBlur, isSubmitting }) => (
							<Form onSubmit={handleSubmit}>
								{dynamicFormFields?.map(
									(field: FormikField, index: number) =>
										field.name !== 'terms' && <FormikSignupFieldWrapper {...field} key={index} />,
								)}
								<div className="edit-user-form__content">
									{enableTermsCheckbox && (
										<div className="edit-user-form__content__checkbox">
											{enableCustomTerms && (
												<div className="edit-user-form__content__label">
													{customTermsDescription}
												</div>
											)}
											<OcCheckboxComponent
												labelText={ordinaryTermsDescription || ''}
												name="terms"
												checked={values.terms}
												touched={String(values.terms)}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
										</div>
									)}
									{errors.terms && <OcError message="Please confirm this checkbox" />}
								</div>
								{formConfigs !== null && (
									<OcButtonComponent
										disabled={isSubmitting}
										htmlType="submit"
										text={submitText}
										type="primary"
										customClass="sign-up__button"
									/>
								)}
							</Form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
};
