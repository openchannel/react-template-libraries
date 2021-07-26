import * as React from 'react';
import { Form, Formik } from 'formik';
import { OcSelect, OcError, OcCheckboxComponent } from '../../../common';
import { configConverter, FormikSignupFieldWrapper } from './utils';
import { OcTooltipLabel } from '../../../form';
import { EditUserComponentProps } from './types';

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
		// onCancel,
		// onSubmit,
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
	} = props;

	const convertedFormConfigs = formConfigs.map((item) =>
		configConverter(item, enablePasswordField),
	);

	const dynamicFormFields: any = React.useMemo(
		() =>
			convertedFormConfigs.filter((config) => config.name === (selectValue?.name || selectValue))[0]
				.fields,
		[selectValue],
	);
	const signUpInitialValues: any = React.useMemo(
		() =>
			dynamicFormFields.reduce((acc: any, item: any) => {
				if (acc[item.name] === undefined) acc[item.name] = '';
				return acc;
			}, {}),
		[dynamicFormFields],
	);

	console.log(formConfigs.length);

	return (
		<div className="edit-user-form">
			{!formConfigs && (
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
					<Formik initialValues={signUpInitialValues} onSubmit={(values) => console.log(values)}>
						{({ /* handleSubmit, */ handleChange, values, errors, handleBlur }) => {
							return dynamicFormFields.map((field: any) => (
								<FormikSignupFieldWrapper
									{...field}
									errors={errors}
									values={values}
									handleChange={handleChange}
									handleBlur={handleBlur}
								/>
							));
						}}
					</Formik>
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
					</div>
				</div>
			)}
		</div>
	);
};
