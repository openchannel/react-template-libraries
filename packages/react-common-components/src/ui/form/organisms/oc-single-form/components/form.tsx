import * as React from 'react';
import { Form as FormikForm, FormikContext, FormikErrors, FormikValues, useFormik } from 'formik';
import { isFunction } from 'lodash-es';

import OcButtonComponent from '../../../../common/atoms/oc-button/oc-button';
import { OcFormContextProvider } from '../context';
import { useOcFormState } from '../hooks';
import { OcFormProps } from '../types';
import {
	formatOcFormErrors,
	formatOcFormValues,
	getOcFormButtonsClass,
	validateOcFormValues,
} from '../utils/common';

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
		customSubmitClass = '',
		customCancelClass = '',
		showSaveBtn = false,
		showSubmitBtn = true,
		saveButtonText = 'Save',
		displayType = 'page',
	} = props;

	const submitType = React.useRef('submit');

	const {
		state: { initialValues, validators, flattenFields, fieldsDefinition },
		updateState,
	} = useOcFormState(formJsonData!);

	const formik: any = useFormik({
		initialValues,
		enableReinitialize: true,
		validate: (values) => validateOcFormValues(formik.values, formik.errors, values, validators, submitType.current),
		onSubmit: (values, formikProps) => {
			if (!onSubmit) {
				return;
			}

			onSubmit(
				formatOcFormValues(fieldsDefinition, values),
				{
					...formikProps,
					setErrors: handleSetErrors,
				},
				submitType.current,
			);
		},
	});

	const handleSetErrors = (errors: FormikErrors<FormikValues>) => {
		const ocFormErrors = formatOcFormErrors(fieldsDefinition, errors);
		formik.setErrors(ocFormErrors);
		formik.setSubmitting(false);
	};

	const handleSubmit = React.useCallback(
		(e) => {
			if (formik.isSubmitting) {
				e.preventDefault();
			} else {
				submitType.current = e.target.dataset.submittype;
				formik.handleSubmit(e);
			}
		},
		[formik.isSubmitting, formik.handleSubmit],
	);

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider
				initialValue={{ flattenFields, fieldsDefinition, updateState }}
				displayType={displayType}
			>
				<FormikForm className="form" onSubmit={handleSubmit} noValidate data-submittype="submit">
					<FormikMapFieldsWrapper
						fieldProps={{ service, fileService }}
						excludeRenderFields={excludeRenderFields}
					/>
					{children ? (isFunction(children) ? children(formik, flattenFields) : children) : null}
					<div className={getOcFormButtonsClass(buttonPosition)}>
						{showSubmitBtn && (
							<div className={`form__button ${customSubmitClass}`}>
								<OcButtonComponent htmlType="submit" type="primary" process={formik.isSubmitting}>
									{submitButtonText}
								</OcButtonComponent>
							</div>
						)}
						{showSaveBtn && (
							<div className="form__button save-draft">
								<OcButtonComponent
									type="secondary"
									process={formik.isSubmitting}
									data-submittype="save"
									onClick={handleSubmit}
								>
									{saveButtonText}
								</OcButtonComponent>
							</div>
						)}
						{onCancel && (
							<div className={`form__button ${customCancelClass}`}>
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
