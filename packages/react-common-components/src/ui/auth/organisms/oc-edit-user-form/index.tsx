import * as React from 'react';
import { Formik, Form } from 'formik';
import { OcSelect, OcError, OcCheckboxComponent, OcButtonComponent } from '../../../common';
import { configConverter, FormikSignupFieldWrapper } from './utils';
import { OcTooltipLabel } from '../../../form';
import { EditUserComponentProps } from './types';
import './style.scss';

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		enableTypesDropdown = false,
		enablePasswordField = false,
		customTermsDescription,
		enableTermsCheckbox,
		termsChecked,
		setTermsChecked,
		defaultTypeLabelText = 'Type',
		selectValue,
		setSelectValue,
		selectConfigOptions,
		onSubmit,
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
		process,
	} = props;

	const convertedFormConfigs = formConfigs?.map((item) =>
		configConverter(item, enablePasswordField),
	);

	const dynamicFormFields: any = React.useMemo(
		() =>
			convertedFormConfigs?.filter(
				(config) => config.name === (selectValue?.name || selectValue),
			)[0]?.fields,
		[selectValue],
	);
	const signUpInitialValues: any = React.useMemo(
		() =>
			dynamicFormFields?.reduce((acc: any, item: any) => {
				if (acc[item.name] === undefined) acc[item.name] = '';
				return acc;
			}, {}),
		[dynamicFormFields],
	);
	console.log(!formConfigs, formConfigs);

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
					<Formik initialValues={signUpInitialValues} onSubmit={onSubmit}>
						{({ handleSubmit, handleChange, values, errors, handleBlur }) => (
							<Form onSubmit={handleSubmit}>
								{dynamicFormFields?.map((field: any) => (
									<FormikSignupFieldWrapper
										{...field}
										errors={errors}
										values={values}
										handleChange={handleChange}
										handleBlur={handleBlur}
									/>
								))}
								<div className="edit-user-form__content">
									{enableTermsCheckbox && (
										<div className="edit-user-form__content__checkbox">
											<OcCheckboxComponent
												labelText={customTermsDescription || ''}
												checked={termsChecked}
												onChange={() => setTermsChecked!(termsChecked!)}
											/>
										</div>
									)}
									{termsChecked && <OcError message="Please confirm this checkbox" />}
									<OcButtonComponent
										disabled={process}
										htmlType="submit"
										text="Sign Up"
										type="primary"
										customClass="sign-up__button"
									/>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
};
