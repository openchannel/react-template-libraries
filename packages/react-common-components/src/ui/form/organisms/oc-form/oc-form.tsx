import * as React from 'react';
import { Formik } from 'formik';
//----------------------------------------------------------------
import { Form as FormikForm, FormikErrors, FormikValues, useFormik } from 'formik';
import { isFunction } from 'lodash-es';
import { OcFormContextProvider } from '../oc-single-form/context';
import { useOcFormState } from '../oc-single-form/hooks';
import {
	formatOcFormErrors,
	formatOcFormValues,
	// getOcFormButtonsClass,
	validateOcFormValues,
} from '../oc-single-form/utils/common';

import { FormikMapFields } from '../oc-single-form/components/formik-map-field';
//----------------------------------------------------------------
import { OcButtonComponent } from '../../../common/atoms/oc-button/oc-button';
import OcTooltipLabel from '../../atoms/oc-tooltip-label';
// import { AppFormModel } from '../../models/app-form';
import { OcSingleForm } from '../oc-single-form/index';
import { OcFormProgressBar } from './oc-form-progress-bar/oc-form-progress-bar';
import { OcFormProps, FieldStep } from './types';
import { createStepsFromJSON } from './utils';

import './style.scss';

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		showSubmitButton = false,
		showProgressBar,
		showGroupHeading,
		showGroupDescription,
		showButton,
		currentStep = 1,
		setCurrentStep,
		maxStepsToShow,
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
	const [progressBarSteps, setProgressBarSteps] = React.useState([]);
	const [hasFieldGroups, setHasFieldGroups] = React.useState(false);
	const isFirstStep = React.useMemo(() => !customForm || currentStep === 1, [currentStep]);
	const isLastStep = React.useMemo(
		() => !customForm || currentStep === customForm?.length,
		[currentStep],
	);

	React.useEffect(() => {
		if (displayType === 'wizard') {
			setCustomForm(createStepsFromJSON(formJsonData));

			if (createStepsFromJSON(formJsonData).length > 1) {
				setHasFieldGroups(true);
				generateProgressbar();
			}
		} else {
			setHasFieldGroups(false);
		}
	}, [hasFieldGroups]);

	const navigateToStep = (step: number) => {
		if (displayType === 'wizard' && setCurrentStep) {
			setCurrentStep(step);
		}
	};
	// const cancelSubmit = () => {};
	const stepDescription = (): string => {
		if (customForm && customForm.label) {
			return customForm.label.label;
		}
		return 'Please fill the information below';
	};

	const stepLabel = React.useMemo(
		() =>
			customForm !== null
				? `Step ${currentStep}. ${
						customForm[currentStep - 1]?.label ? customForm[currentStep - 1]?.label?.label : ''
				  }`
				: '',
		[currentStep, customForm],
	);

	const generateProgressbar = (): void => {
		const progressBarSteps =
			customForm?.length > 1
				? customForm?.map((step: FieldStep, index: number) => ({
						title: step.label ? step.label.label : `Step ${index + 1}`,
						state: 'pristine',
				  }))
				: [];
		setProgressBarSteps(progressBarSteps);
	};
	const singleStepsFormConfig = React.useMemo(
		() => (customForm !== null ? customForm[currentStep - 1]?.items : []),
		[currentStep, customForm],
	);

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
								required={customForm.label?.attributes?.required}
								description={customForm.label?.description}
							/>
						)}
						{showGroupDescription && (
							<p className="form-steps__content-body-description">{stepDescription}</p>
						)}
						<Formik initialValues={singleStepsFormConfig} onSubmit={handleSubmit}>
							{({ isSubmitting, errors, values, touched }) => (
								<FormikMapFields
									fields={singleStepsFormConfig}
									service={service}
									fileService={fileService}

									// excludeRenderFields={excludeRenderFields}
								/>
								// {children
								// 	? isFunction(children)
								// 		? children(formik, flattenFields)
								// 		: children
								// 	: null}
							)}
						</Formik>

						{/* <OcSingleForm
							formJsonData={singleStepsFormConfig as AppFormModel}
							generatedForm={currentForm}
							labelPosition={labelPosition}
							showSubmitBtn={showSubmitButton && isLastStep}
						/> */}
					</div>
				</div>
			) : (
				<OcSingleForm
					formJsonData={formJsonData}
					labelPosition={labelPosition}
					showSubmitBtn={showSubmitButton && isLastStep}
				/>
			)}
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
					{currentStep && currentStep < customForm?.length && (
						<OcButtonComponent
							onClick={() => navigateToStep(currentStep + 1)}
							customClass="form__button"
							type="primary"
							text="Next step"
						/>
					)}
					{showSubmitButton && isLastStep && (
						<OcButtonComponent
							onClick={onSubmit as any}
							process={process}
							customClass="form__button"
							type="primary"
							text="successButtonText"
						/>
					)}
				</div>
			)}
		</div>
	);
};
