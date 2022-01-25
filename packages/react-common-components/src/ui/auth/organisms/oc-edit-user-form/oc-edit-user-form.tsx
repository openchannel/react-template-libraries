import * as React from 'react';

import { OcSingleForm } from '../../../form';

import { EditUserComponentProps } from './types';

import './style.scss';

export const OcEditUserFormComponent: React.FC<EditUserComponentProps> = (props) => {
	const {
		formConfigs,
		onSubmit,
		defaultFormType = '',
		defaultTypeLabelText = 'Type',
		defaultEmptyConfigsErrorTemplate,
		defaultEmptyConfigsErrorMessage = 'There are no forms configured',
		submitButtonText = 'Submit',
		customSubmitClass = '',
		customCancelClass = '',
	} = props;

	return (
		<div className="edit-user-form">
			{!formConfigs.length &&
				(defaultEmptyConfigsErrorTemplate ? (
					defaultEmptyConfigsErrorTemplate
				) : (
					<h6 className="edit-user-form__empty_form_configs">{defaultEmptyConfigsErrorMessage}</h6>
				))}
			{formConfigs?.length > 0 && (
				<OcSingleForm
					formConfigs={formConfigs}
					onSubmit={onSubmit}
					formTypeLabel={defaultTypeLabelText}
					defaultFormType={defaultFormType}
					submitButtonText={submitButtonText}
					customSubmitClass={customSubmitClass}
					customCancelClass={customCancelClass}
				/>
			)}
		</div>
	);
};
