import * as React from 'react';
import { OcSelect, OcError, OcCheckboxComponent } from '../../../common';
import { OcForm, OcTooltipLabel } from '../../../form';
import { EditUserComponentProps /* , OcEditUserFormConfig */ } from './types';

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		enableTypesDropdown = false,
		customTermsDescription,
		enableTermsCheckbox,
		termsChecked,
		setTermsChecked,
		defaultTypeLabelText = 'Type',
		selectedConfig,
		setSelectedConfig,
		onCancel,
		onSubmit,
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
	} = props;

	console.log(selectedConfig);
	console.log(formConfigs);
	// const buildFormByConfig = (formConfig: OcEditUserFormConfig): void => {
	// 	// clearPreviousValues();
	// 	const fieldsSorting = (field1: { id: string }, field2: { id: string }) => {
	// 		const index1 = formConfig.fieldsOrder!.indexOf(field1.id);
	// 		const index2 = formConfig.fieldsOrder!.indexOf(field2.id);
	// 		return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
	// 	};
	// };

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
								selectValArr={[selectedConfig!]}
								onSelectionChange={setSelectedConfig}
								labelField="name"
							/>
						</>
					)}

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
				</div>
			)}
		</div>
	);
};
