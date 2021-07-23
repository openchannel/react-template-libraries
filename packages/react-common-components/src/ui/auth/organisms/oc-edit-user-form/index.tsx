import * as React from 'react';
// import { Formik } from 'formik';
import { OcSelect, OcError, OcCheckboxComponent } from '../../../common';
import { configConverter } from './utils';
import { OcForm, OcTooltipLabel /* FormikMapFields */ } from '../../../form';
import { EditUserComponentProps } from './types';
import type { AppFormModel } from '../../../form/models';

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

	const dynamicFormFields: AppFormModel = React.useMemo(
		() =>
			convertedFormConfigs.filter((config) => config.name === (selectValue?.name || selectValue))[0]
				.fields,
		[selectValue],
	);

	return (
		<div className="edit-user-form">
			{!formConfigs && (
				<h6 className="edit-user-form__empty_form_configs">{defaultEmptyConfigsErrorMessage}</h6>
			)}
			{formConfigs?.length > 0 && (
				<div>
					{/* <Formik
						initialValues={dynamicFormFields[0].fields.map((field) => field.name)}
						onSubmit={(values) => console.log(values)}
					> */}
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
					<OcForm formJsonData={dynamicFormFields} onSubmit={() => {}} onCancel={() => {}} />
					<div className="edit-user-form__consent">
						{enableTermsCheckbox && (
							<div className="edit-user-form__consent__checkbox">
								<OcCheckboxComponent
									labelText={customTermsDescription || ''}
									checked={termsChecked}
									onChange={() => setTermsChecked!(termsChecked!)}
								/>
							</div>
						)}
						{termsChecked && <OcError message="Please confirm this checkbox" />}
					</div>
					{/* </Formik> */}
				</div>
			)}
		</div>
	);
};
