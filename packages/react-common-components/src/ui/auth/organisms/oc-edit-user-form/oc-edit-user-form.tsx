import * as React from 'react';
import { Form, Formik, FormikErrors, FormikProps, FormikValues } from 'formik';

import { OcButtonComponent, OcCheckboxComponent, OcError } from '../../../common/atoms';
import { OcSelect, Option } from '../../../common/molecules';
import { FormikField, FormikMapFields, OcFormValues } from '../../../form';
import { OcTooltipLabel } from '../../../form/atoms';
import { validateOcFormValues } from '../../../form/organisms/oc-form/utils/common';
import { fieldsUtils } from '../../../form/organisms/oc-form/utils/fields';

import { configConverter } from './utils';
import { EditUserComponentProps } from './types';

import './style.scss';

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		onSubmit,
		defaultFormType = '',
		enableTypesDropdown = false,
		enablePasswordField = false,
		customTermsDescription = '',
		ordinaryTermsDescription = '',
		enableTermsCheckbox = false,
		defaultTypeLabelText = 'Type',
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
		submitText = 'Submit',
	} = props;

	const formikRef = React.createRef<FormikProps<FormikValues>>();

	const formTypes: string[] = React.useMemo(
		() => formConfigs.map((config) => config.name),
		[formConfigs],
	);

	const [formType, setFormType] = React.useState<string>('');

	React.useEffect(() => {
		if (!formType && formTypes.length > 0) {
			setFormType(defaultFormType || formTypes[0]);
		}
	}, [formType, formTypes]);

	const dynamicFormFields = React.useMemo(
		() =>
			formConfigs
				?.map((item) => configConverter(item, enablePasswordField, enableTermsCheckbox))
				?.filter((config) => config.name === formType)[0]?.fields || [],
		[formConfigs, enablePasswordField, enableTermsCheckbox, formType],
	);

	const initialValues: OcFormValues = React.useMemo(
		() =>
			dynamicFormFields.reduce((acc, field) => {
				(acc as any)[field.name!] = field.defaultValue != null ? field.defaultValue : '';
				return acc;
			}, {}),
		[dynamicFormFields],
	);

	const handleFormTypeChange = React.useCallback((formType: string | Option) => {
		if (typeof formType === 'string') {
			setFormType(formType);
		} else {
			setFormType(formType.name);
		}
	}, []);

	const validate = React.useCallback(
		(values: OcFormValues): void | object | Promise<FormikErrors<FormikValues>> => {
			const formik = formikRef.current;
			if (formik != null) {
				const validators = fieldsUtils.getValidators((dynamicFormFields as FormikField[]) || []);
				return validateOcFormValues(formik.values, formik.errors, values, validators);
			}
		},
		[dynamicFormFields],
	);

	const formFields = React.useMemo(() => {
		// remove 'terms' checkbox to render render it by hand
		return dynamicFormFields.filter((f) => f.name !== 'terms') as FormikField[];
	}, [dynamicFormFields]);

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
						{({
							handleSubmit,
							handleChange,
							values,
							touched,
							errors,
							handleBlur,
							isSubmitting,
						}) => (
							<Form onSubmit={handleSubmit}>
								<FormikMapFields fields={formFields} />
								<div className="edit-user-form__content">
									{enableTermsCheckbox && (
										<div className="edit-user-form__content__checkbox">
											{customTermsDescription && (
												<div className="edit-user-form__content__label">
													{customTermsDescription}
												</div>
											)}
											<OcCheckboxComponent
												labelText={ordinaryTermsDescription}
												name="terms"
												checked={values.terms}
												touched={String(touched.terms)}
												onBlur={handleBlur}
												onChange={handleChange}
											/>
										</div>
									)}
									{touched.terms && errors.terms && (
										<OcError message="Please confirm this checkbox" />
									)}
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
