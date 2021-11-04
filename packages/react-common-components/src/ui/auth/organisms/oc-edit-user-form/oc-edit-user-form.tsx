import * as React from 'react';

import { OcForm } from '../../../form';

import { EditUserComponentProps } from './types';
import { AgreeWithTermsCheckbox } from './agree-with-terms-checkbox';

import './style.scss';

const ExcludeRenderFields = ['terms'];

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		onSubmit,
		defaultFormType = '',
		enablePasswordField = false,
		customTermsDescription,
		ordinaryTermsDescription,
		enableTermsCheckbox = false,
		defaultTypeLabelText = 'Type',
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
		submitButtonText = 'Submit',
	} = props;

	return (
		<div className="edit-user-form">
			{!formConfigs.length && (
				<h6 className="edit-user-form__empty_form_configs">{defaultEmptyConfigsErrorMessage}</h6>
			)}
			{formConfigs?.length > 0 && (
				<OcForm
					formConfigs={formConfigs}
					onSubmit={onSubmit}
					formTypeLabel={defaultTypeLabelText}
					defaultFormType={defaultFormType}
					enablePasswordField={enablePasswordField}
					enableTermsCheckboxField={true}
					submitButtonText={submitButtonText}
					excludeRenderFields={ExcludeRenderFields}
				>
					{enableTermsCheckbox && (
						(formikProps, formFields) => (
							<AgreeWithTermsCheckbox
								formikProps={formikProps}
								formFields={formFields}
								customTermsDescription={customTermsDescription}
								ordinaryTermsDescription={ordinaryTermsDescription}
							/>
						)
					)}
				</OcForm>
				// 				{formConfigs !== null && (
				// 					<OcButtonComponent
				// 						disabled={isSubmitting}
				// 						htmlType="submit"
				// 						text={submitText}
				// 						type="primary"
				// 						customClass="sign-up__button"
				// 					/>
				// 				)}
				// 			</Form>
				// 		)}
				// 	</Formik>
				// </div>
			)}
		</div>
	);
};
