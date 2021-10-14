import * as React from 'react';
import {
	Form as FormikForm,
	FormikContext,
	FormikValues,
	useFormik
} from 'formik';

import OcButtonComponent from '../../../../common/atoms/oc-button/oc-button';
import { OcFormContextProvider } from '../context';
import { useOcFormState } from '../hooks';
import { OcFormProps } from '../types';
import {
	formatOcFormErrors,
	formatOcFormValues,
	getOcFormButtonsClass,
	validateOcFormValues
} from '../utils/common';

import { FormikMapFieldsWrapper } from './formik-map-field';

import '../style.scss';
import {FormikErrors} from 'formik/dist/types';

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		onSubmit,
		onCancel,
		successButtonText = 'Submit',
		buttonPosition = 'left',
		service,
	} = props;

	const {
		state: { initialValues, validators, flattenFields, fieldsDefinition },
		updateState,
	} = useOcFormState(formJsonData);

	const formik: any = useFormik({
		initialValues,
		validate: values => validateOcFormValues(formik.values, formik.errors, values, validators),
		onSubmit: (values, formikProps) => {
			const overriddenProps = {...formikProps, setErrors: handleSetErrors};
			onSubmit(formatOcFormValues(fieldsDefinition, values), overriddenProps);
		},
	});

	const handleSetErrors = (errors: FormikErrors<FormikValues>) => {
		const ocFormErrors = formatOcFormErrors(fieldsDefinition, errors);
		formik.setErrors(ocFormErrors);
		formik.setSubmitting(false);
	}

	const handleSubmit = React.useCallback(
		(e) => {
			if (formik.isSubmitting) {
				e.preventDefault();
			} else {
				formik.handleSubmit(e);
			}
		},
		[formik.isSubmitting, formik.handleSubmit],
	);

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ flattenFields, fieldsDefinition, updateState }}>
				<FormikForm className="form" onSubmit={handleSubmit} noValidate>
					<FormikMapFieldsWrapper service={service} />
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className={`form__button ${!onCancel ? 'full-width' : ''}`}>
							<OcButtonComponent htmlType="submit" type="primary" process={formik.isSubmitting}>
								{successButtonText}
							</OcButtonComponent>
						</div>
						{onCancel && (
							<div className="form__button">
								<OcButtonComponent htmlType="button" type="secondary" onClick={onCancel}>
									Cancel
								</OcButtonComponent>
							</div>
						)}
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	);
};
