import * as React from 'react';
import { Form as FormikForm, FormikContext, useFormik } from 'formik';

import { OcButtonComponent } from '../../../../common';
import { OcFormContextProvider } from '../context';
import { useFormikValidation, useOcFormState } from '../hooks';
import { OcFormProps } from '../types';
import { formatOcFormValues, getOcFormButtonsClass } from '../utils/common';

import { FormikMapFieldsWrapper } from './formik-map-field';

import '../style.scss';

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		onSubmit,
		onCancel,
		successButtonText = 'Submit',
		buttonPosition = 'left',
	} = props;

	const {
		state: { initialValues, validators, flattenFields, fieldsDefinition },
		updateState,
	} = useOcFormState(formJsonData);

	const { validate } = useFormikValidation(validators);

	const formik = useFormik({
		initialValues,
		validate,
		onSubmit: (values, formikProps) => {
			onSubmit(formatOcFormValues(fieldsDefinition, values), formikProps);
		},
	});

	const handleCancel = React.useCallback(() => {
		if (formik.isSubmitting) return;
		onCancel();
	}, [formik.isSubmitting, onCancel]);

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ flattenFields, fieldsDefinition, updateState }}>
				<FormikForm className="form" onSubmit={formik.handleSubmit}>
					<FormikMapFieldsWrapper />
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className="form__button">
							<OcButtonComponent htmlType="submit" type="primary" process={formik.isSubmitting}>
								{successButtonText}
							</OcButtonComponent>
						</div>
						<div className="form__button">
							<OcButtonComponent
								htmlType="button"
								type="secondary"
								onClick={handleCancel}
								process={formik.isSubmitting}
							>
								Cancel
							</OcButtonComponent>
						</div>
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	);
};
