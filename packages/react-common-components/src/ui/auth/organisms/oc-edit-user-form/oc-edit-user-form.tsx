import * as React from 'react';
import { Formik, Form } from 'formik';
import OcSelect from '../../../common/molecules/oc-select/oc-select';
import OcError from '../../../common/atoms/oc-error/oc-error';
import OcCheckboxComponent from '../../../common/atoms/oc-checkbox/oc-checkbox';
import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcTooltipLabel from '../../../form/atoms/oc-tooltip-label/oc-tooltip-label';
import { configConverter, FormikSignupFieldWrapper } from './utils';
import { FormikField } from '../../../form';
import { useFormikValidation } from '../../../form/organisms/oc-form/hooks';
import { fieldsUtils } from '../../../form/organisms/oc-form/utils/fields';
import { EditUserComponentProps, InitialFormikValues } from './types';
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
	} = props;

	const selectConfigOptions: any[] = formConfigs.map((config) => config.name);
	const [selectValue, setSelectValue] = React.useState(selectConfigOptions[0]);

	const dynamicFormFields: any[] = formConfigs
	?.map((item) => configConverter(item, enablePasswordField, enableTermsCheckbox))
	?.filter((config) => config.name === (selectValue?.name || selectValue))[0]?.fields;

	const signUpInitialValues: InitialFormikValues = React.useMemo(() => {
		const result = dynamicFormFields?.reduce((acc: any, item: any) => {
			if (acc[item.name] === undefined) acc[item.name] = '';
			return acc;
		}, {});
		if (enableTermsCheckbox) {
			result.terms = false;
		}
		if (enablePasswordField) {
			result.password = '';
		}

		return result;
	}, [dynamicFormFields, enableTermsCheckbox, enablePasswordField]);

	const { validate } = useFormikValidation(
		fieldsUtils.getValidators(dynamicFormFields?.length ? dynamicFormFields : []),
	);

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
								selectValArr={selectConfigOptions}
								onSelectionChange={setSelectValue}
								labelField="name"
								value={selectValue}
							/>
						</>
					)}
					<Formik
						initialValues={signUpInitialValues}
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
												touched={values.terms}
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
										text="Sign Up"
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
