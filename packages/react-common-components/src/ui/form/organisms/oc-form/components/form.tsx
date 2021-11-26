import * as React from 'react';
import { isFunction } from 'lodash-es';
import { Form as FormikForm, FormikContext, FormikValues, useFormik, FormikErrors } from 'formik';

import OcButtonComponent from '../../../../common/atoms/oc-button/oc-button';

import {
	formatOcFormErrors,
	formatOcFormValues,
	getOcFormButtonsClass,
	validateOcFormValues,
} from '../utils/common';
import { OcFormProps } from '../types';
import { useOcFormState } from '../hooks';
import { OcFormContextProvider } from '../context';

import { FormikMapFieldsWrapper } from './formik-map-field';

import '../style.scss';

export const Form: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		onSubmit,
		onCancel,
		submitButtonText = 'Submit',
		buttonPosition = 'left',
		service,
		fileService,
		children,
		excludeRenderFields,
		cancelButtonText = 'Cancel',
	} = props;

	const {
		state: { initialValues, validators, flattenFields, fieldsDefinition },
		updateState,
	} = useOcFormState(formJsonData!);

	const formik: any = useFormik({
		initialValues,
		enableReinitialize: true,
		validate: (values) => validateOcFormValues(formik.values, formik.errors, values, validators),
		onSubmit: (values, formikProps) => {
			if (!onSubmit) {
				return;
			}

			onSubmit(formatOcFormValues(fieldsDefinition, values), {
				...formikProps,
				setErrors: handleSetErrors,
			});
		},
	});

	const handleSetErrors = React.useCallback(
		(errors: FormikErrors<FormikValues>) => {
			const ocFormErrors = formatOcFormErrors(fieldsDefinition, errors);
			formik.setErrors(ocFormErrors);
			formik.setSubmitting(false);
		},
		[formik.setErrors, formik.setSubmitting, fieldsDefinition],
	);

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
					<FormikMapFieldsWrapper
						service={service}
						fileService={fileService}
						excludeRenderFields={excludeRenderFields}
					/>
					{children ? (isFunction(children) ? children(formik, flattenFields) : children) : null}
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className={`form__button ${!onCancel ? 'full-width' : ''}`}>
							<OcButtonComponent htmlType="submit" type="primary" process={formik.isSubmitting}>
								{submitButtonText}
							</OcButtonComponent>
						</div>
						{onCancel && (
							<div className="form__button">
								<OcButtonComponent htmlType="button" type="secondary" onClick={onCancel}>
								   {cancelButtonText}
								</OcButtonComponent>
							</div>
						)}
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	);
};
