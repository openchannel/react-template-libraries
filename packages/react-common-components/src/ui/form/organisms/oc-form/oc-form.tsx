import * as React from 'react';
import { FormikContext } from 'formik';
import { Form as FormikForm, FormikErrors, FormikValues, useFormik } from 'formik';
import { isFunction, noop } from 'lodash-es';
import { useOcFormState } from '../oc-single-form/hooks';
import {
	formatOcFormErrors,
	formatOcFormValues,
	validateOcFormValues,
} from '../oc-single-form/utils/common';

import { FormikMapFieldsWrapper } from '../oc-single-form/components/formik-map-field';
import { OcButtonComponent } from '../../../common/atoms/oc-button/oc-button';
import OcTooltipLabel from '../../atoms/oc-tooltip-label';
import { OcSingleForm } from '../oc-single-form';
import {
	FormProgressbarStep,
	OcFormProgressBar,
} from './oc-form-progress-bar/oc-form-progress-bar';
import { OcFormProps, FieldStep } from './types';
import { createStepsFromJSON, reGenerateProgressbar } from './utils';
import { AppFormModel, FormikField } from '../../models/app-form';
import './style.scss';
import { OcFormContextProvider } from '../oc-single-form/context';

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		showSubmitButton = false,
		showProgressBar,
		showGroupHeading,
		showGroupDescription,
		showButton,
		showSaveBtn,
		saveButtonText = 'Save',
		currentStep = 1,
		setCurrentStep = noop,
		maxStepsToShow,
		setMaxStepsToShow,
		labelPosition,
		buttonPosition,
		process,
		onSubmit,
		additionalButton,
		displayType,
		children,
		service,
		fileService,
	} = props;

	//eslint-disable-next-line
	const [customForm, setCustomForm] = React.useState<FieldStep[] | any>(null);
	const [progressBarSteps, setProgressBarSteps] = React.useState<FormProgressbarStep[]>([]);
	const [hasFieldGroups, setHasFieldGroups] = React.useState(false);
	const isFirstStep = React.useMemo(() => !customForm || currentStep === 1, [currentStep]);
	const isLastStep = React.useMemo(() => currentStep === customForm?.length, [currentStep]);
	const submitType = React.useRef('submit');
	const {
		state: { initialValues, validators, flattenFields, fieldsDefinition },
		updateState,
	} = useOcFormState(formJsonData!);

	const singleStepsFormConfig: FormikField[] = React.useMemo(
		() => (customForm !== null ? customForm[currentStep - 1]?.items : []),
		[currentStep, customForm],
	);

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
					setErrors: (errors: FormikErrors<FormikValues>) => {
						const ocFormErrors = formatOcFormErrors(fieldsDefinition, errors);
						formikProps.setErrors(ocFormErrors);
						formikProps.setSubmitting(false);
					},
				},
				submitType.current,
			);
		},
	});
	React.useEffect(() => {
		if (displayType === 'wizard') {
			const JsonWithNames: unknown = { ...formJsonData, fields: fieldsDefinition };
			setCustomForm(createStepsFromJSON(JsonWithNames as AppFormModel));

			if (createStepsFromJSON(formJsonData).length > 1) {
				setHasFieldGroups(true);
				initializeProgressBar();
			}
		} else {
			setHasFieldGroups(false);
		}
	}, [hasFieldGroups]);

	React.useEffect(() => {
		reGenerateProgressbar(
			customForm,
			formik,
			setProgressBarSteps,
			currentStep,
			createInitialProgressBar,
		);
	}, [formik.errors, formik.touched, currentStep]);

	const navigateToStep = (step: number) => {
		if (displayType === 'wizard' && setCurrentStep) {
			setCurrentStep(step);
			customForm?.forEach((stepForm: FieldStep | any) => {
				stepForm?.items.forEach((field: any) => {
					if (field.step < step - 1) {
						formik.touched = { ...formik.touched, [field.name]: true };
						formik.setTouched({ ...formik.touched, [field.name]: true });
					}
				});
			});
		}
	};
	// const cancelSubmit = () => {};
	const stepDescription = React.useMemo((): string => {
		if (customForm !== null) {
			return customForm[currentStep - 1].label &&
				customForm[currentStep - 1].label?.description?.length > 0
				? customForm[currentStep - 1].label?.description
				: 'Please fill the information below';
		} else return 'Please fill the information below';
	}, [customForm, currentStep]);

	const stepLabel = React.useMemo(
		() =>
			customForm !== null
				? `Step ${currentStep}. ${
						customForm[currentStep - 1]?.label ? customForm[currentStep - 1]?.label?.label : ''
				  }`
				: '',
		[currentStep, customForm],
	);

	const createInitialProgressBar = React.useCallback(
		() =>
			customForm?.length > 1
				? customForm?.map((step: FieldStep, index: number) => ({
						title: step.label ? step.label.label : `Step ${index + 1}`,
						state: 'pristine',
				  }))
				: [],
		[customForm],
	);

	const initializeProgressBar = (): void => setProgressBarSteps(createInitialProgressBar());

	const handleSubmit = React.useCallback(
		(e) => {
			if (formik.isSubmitting) {
				e.preventDefault();
			} else {
				const index = progressBarSteps.findIndex((step) => step.state === 'invalid');
				if (index === -1) {
					submitType.current = e.target.dataset.submittype ? e.target.dataset.submittype : 'submit';
					return formik.handleSubmit(e);
				}
				return setCurrentStep(index + 1);
			}
		},
		[formik.isSubmitting, formik.handleSubmit, progressBarSteps],
	);
	React.useEffect(() => {
		if (window.innerWidth <= 768) {
			setMaxStepsToShow(3);
		}
	}, [window.innerWidth]);

	return (
		<div className="form-steps">
			{hasFieldGroups ? (
				<div className="form-steps__content">
					<div className="form-steps__content-progressbar">
						{showProgressBar && (
							<OcFormProgressBar
								jumpToStep={navigateToStep}
								maxStepsToShow={maxStepsToShow}
								progressbarData={progressBarSteps}
								currentStep={currentStep}
							/>
						)}
					</div>
					<div className="form-steps__content-body">
						{showGroupHeading && (
							<OcTooltipLabel
								text={stepLabel}
								labelClass="form-steps__content-body-label"
								required={customForm[currentStep - 1].label?.attributes?.required || false}
								description={customForm[currentStep - 1]?.label?.description || ''}
							/>
						)}
						{showGroupDescription && (
							<p className="form-steps__content-body-description">{stepDescription}</p>
						)}
						<FormikContext.Provider value={formik}>
							<OcFormContextProvider
								initialValue={{
									flattenFields,
									fieldsDefinition: singleStepsFormConfig,
									updateState,
								}}
								displayType={displayType}
							>
								<FormikForm
									className="form"
									onSubmit={handleSubmit}
									noValidate
									data-submittype="submit"
								>
									<FormikMapFieldsWrapper
										fieldProps={{ service, fileService }}
										displayType={displayType}
										// excludeRenderFields={excludeRenderFields}
									/>
									{children
										? isFunction(children)
											? children(formik, flattenFields)
											: children
										: null}
										{showButton && (
											<div className={`form-steps__options form-steps__options--${buttonPosition}`}>
												{isFirstStep && (
													<OcButtonComponent
														customClass="form__button"
														type="secondary"
														text="Cancel"
														// onClick={cancelSubmit}
													/>
												)}
												{currentStep && currentStep > 1 && (
													<OcButtonComponent
														onClick={() => navigateToStep(currentStep - 1)}
														customClass="form__button"
														type="secondary"
														text="Previous step"
													/>
												)}
												{additionalButton && <div>{additionalButton}</div>}
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
												{currentStep && currentStep < customForm?.length && (
													<OcButtonComponent
														onClick={() => navigateToStep(currentStep + 1)}
														customClass="form__button"
														type="primary"
														text="Next step"
													/>
												)}
												{showButton && isLastStep && (
													<OcButtonComponent
														onClick={handleSubmit}
														process={process}
														customClass="form__button"
														type="primary"
														text="Submit"
														data-submittype="submit"
													/>
												)}
											</div>
										)}
								</FormikForm>
							</OcFormContextProvider>
						</FormikContext.Provider>
					</div>
				</div>
			) : (
				<OcSingleForm
					formJsonData={formJsonData}
					labelPosition={labelPosition}
					showSubmitBtn={showSubmitButton && isLastStep}
				/>
			)}
			
		</div>
	);
};
