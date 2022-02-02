import * as React from 'react';
import { noop } from 'lodash-es';
import { OcButtonComponent } from '../../../common/atoms/oc-button/oc-button';
import OcTooltipLabel from '../../atoms/oc-tooltip-label';
import { OcSingleForm } from '../oc-single-form';
import {
	FormProgressbarStep,
	OcFormProgressBar,
} from './oc-form-progress-bar/oc-form-progress-bar';
import { OcFormProps, FieldStep } from './types';
import { createStepsFromJSON, reGenerateProgressbar } from './utils';
import { AppFormModel } from '../../models/app-form';
import './style.scss';

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
		onSubmit = noop,
		additionalButton,
		displayType,
		// children,
		service,
		fileService,
	} = props;

	const [customForm, setCustomForm] = React.useState<FieldStep[] | null>(null);
	const [progressBarSteps, setProgressBarSteps] = React.useState<FormProgressbarStep[]>([]);
	const [hasFieldGroups, setHasFieldGroups] = React.useState(false);
	const isFirstStep = React.useMemo(() => !customForm || currentStep === 1, [currentStep]);
	const isLastStep = React.useMemo(() => currentStep === customForm?.length, [currentStep]);
	const [formik, pullFormik] = React.useState<any>({
		errors: {},
		touched: {},
		isSubmitting: false,
	});
	const [fieldsDefinition, pullFieldsDefinition] = React.useState<any>();
	const submitType = React.useRef('submit');
	// const {
	// 	state: { initialValues, validators, flattenFields, fieldsDefinition },
	// 	updateState,
	// } = useOcFormState(formJsonData!);

	const singleStepsFormId: string[] | undefined = React.useMemo(
		() => (customForm !== null ? customForm[currentStep - 1]?.items?.map((i) => i.id) : []),
		[currentStep, customForm],
	);
	const initializeProgressBar = (): void =>
		setProgressBarSteps(createInitialProgressBar() as FormProgressbarStep[]);

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
	}, [hasFieldGroups, fieldsDefinition]);

	React.useEffect(() => {
		reGenerateProgressbar(
			customForm,
			formik,
			setProgressBarSteps,
			currentStep,
			createInitialProgressBar,
		);
	}, [formik.errors, formik.touched, currentStep, fieldsDefinition]);

	const stepLabel =
		customForm !== null
			? `Step ${currentStep}. ${
					customForm[currentStep - 1]?.label ? customForm[currentStep - 1]?.label?.label : ''
			  }`
			: '';
	const stepDescription =
		customForm !== null
			? customForm[currentStep - 1]?.label?.description || 'Please fill the information below'
			: 'Please fill the information below';

	React.useEffect(() => {
		if (window.innerWidth <= 768) {
			setMaxStepsToShow(3);
		}
	}, [window.innerWidth]);

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

	const createInitialProgressBar = React.useCallback(
		() =>
			customForm !== null && customForm.length > 1
				? customForm?.map((step: FieldStep, index: number) => ({
						title: step.label ? step.label.label : `Step ${index + 1}`,
						state: 'pristine',
				  }))
				: [],
		[customForm],
	);

	const handleSubmit = React.useCallback(
		(e) => {
			if (formik.isSubmitting) {
				e.preventDefault();
			} else {
				const index = progressBarSteps.findIndex((step) => step.state === 'invalid');
				if (index === -1) {
					onSubmit(formik.values);
					submitType.current = e.target.dataset.submittype ? e.target.dataset.submittype : 'submit';
					formik.handleSubmit(formik.values);
				} else setCurrentStep(index + 1);
			}
		},
		[formik.isSubmitting, formik.handleSubmit, progressBarSteps, formik.values],
	);
	const excludeOtherIds = formJsonData?.fields
		?.map((i) => i.id)
		.filter((field) => !singleStepsFormId?.includes(field));

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
								required={
									false ||
									(customForm !== null && customForm[currentStep - 1]?.label?.attributes?.required)
								}
								description={labelPosition}
							/>
						)}
						{showGroupDescription && (
							<p className="form-steps__content-body-description">{stepDescription}</p>
						)}
						<OcSingleForm
							formJsonData={formJsonData}
							labelPosition={labelPosition}
							excludeRenderFields={excludeOtherIds}
							pullFormik={pullFormik}
							pullFieldsDefinition={pullFieldsDefinition}
							service={service}
							fileService={fileService}
							showSubmitBtn={false}
						>
							{showButton && (
								<div className={`form-steps__options form-steps__options--${buttonPosition}`}>
									{isFirstStep && (
										<OcButtonComponent customClass="form__button" type="secondary" text="Cancel" />
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
									{currentStep && customForm !== null && currentStep < customForm?.length && (
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
											process={formik.isSubmitting}
											customClass="form__button"
											type="primary"
											data-submittype="submit"
											text="Submit"
										/>
									)}
								</div>
							)}
						</OcSingleForm>
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
