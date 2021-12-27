import * as React from 'react';
import { FormikValues } from 'formik';

import { OcButtonComponent } from '../../../common/atoms/oc-button/oc-button';
import OcTooltipLabel from '../../atoms/oc-tooltip-label';
import { AppFormField, AppFormModel } from '../../models/app-form';
import { OcSingleForm } from '../oc-single-form/index';

import {
	FormProgressbarStep,
	OcSingleFormProgressBar,
} from './oc-form-progress-bar/oc-form-progress-bar';

import './style.scss';

export interface FieldStep {
	label?: AppFormField;
	items?: AppFormField[];
}

export type FormType = 'wizard' | 'page';

export interface OcFormProps {
	/**
	 * Form config
	 */
	formJsonData?: AppFormModel;
	/**
	 * form type: wizard or ordinary(page)
	 */
	displayType: FormType;
	/**
	 * Set position of the field label.
	 * @default left
	 */
	buttonPosition?: 'top' | 'left' | 'right' | 'between';
	/**
	 * You can set the number of steps to show. If set to 0, this option is turned off and all the steps will be visible.
	 */
	maxStepsToShow: number;
	/**
	 * Custom template for the Save button to show.
	 */
	additionalButton?: React.ReactElement | React.ReactNode;
	/**
	 * Set position of the field label.
	 * @param {('top'|'left'|'right')} position
	 * @default top
	 */
	labelPosition?: 'top' | 'left' | 'right';
	/**
	 * Submitting process. The true option will lock for click and start the spinner in the submit button.
	 */
	process?: boolean;
	/**
	 * flag to show buttons on form
	 */
	showButton?: boolean;
	/**
	 * Flag to show group description.
	 */
	showGroupDescription?: boolean;
	/**
	 * Flag to show group heading.
	 */
	showGroupHeading?: boolean;
	/**
	 * Flag to show progressbar.
	 */
	showProgressBar?: boolean;
	/**
	 * flag to show submit button on form
	 */
	showSubmitButton?: boolean;
	/**
	 * Set custom text to success button.
	 */
	successButtonText?: string;
	/**
	 * Progressbar steps array to be passed to progress
	 */
	progressBarSteps?: FormProgressbarStep[];
	/**
	 * handler to submit form
	 */
	onSubmit: (values: FormikValues) => void;
	/**
	 * hasFieldGroups boolean flag
	 */
	hasFieldGroups?: boolean;
	/**
	 * Current wizard step.
	 */
	currentStep?: number;
	/**
	 * setCurrentStep is setter function for current form step
	 */
	setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
}

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		showSubmitButton,
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

	const createStepsFromJSON = (data: AppFormModel | undefined): FieldStep[] => {
		const formsArray: FieldStep[] = [];
		const currentFreeFieldsStep: FieldStep = {
			items: [],
		};
		data?.fields?.forEach((field, index) => {
			if (field.type === 'fieldGroup') {
				if (currentFreeFieldsStep.items && currentFreeFieldsStep.items.length > 0) {
					formsArray.push({ ...currentFreeFieldsStep });
					currentFreeFieldsStep.items = [];
				}
				const step: FieldStep = {
					label: field,
					items: data.fields?.filter(
						(item) => item.attributes?.group === field.id.replace('customData.', ''),
					),
				};
				if (step.items?.length) {
					formsArray.push(step);
				}
			} else {
				if (!field.attributes?.group) {
					currentFreeFieldsStep.items?.push(field);
					if (data.fields && index === data.fields?.length - 1) {
						formsArray.push(currentFreeFieldsStep);
					}
				}
			}
		});
		return formsArray;
	};

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
		() =>
			customForm !== null
				? {
						...formJsonData,
						// formId: formJsonData?.formId || '',
						fields: customForm[currentStep - 1]?.items,
				  }
				: {},
		[currentStep, customForm],
	);
	console.log('singleStepsFormConfig', singleStepsFormConfig);

	return (
		<div className="form-steps">
			{hasFieldGroups ? (
				<div className="form-steps__content">
					<div className="form-steps__content-progressbar">
						{showProgressBar && (
							<OcSingleFormProgressBar
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
						<OcSingleForm
							formJsonData={singleStepsFormConfig as AppFormModel}
							// generatedForm={currentForm}
							labelPosition={labelPosition}
						/>
					</div>
				</div>
			) : (
				<OcSingleForm
					formJsonData={formJsonData}
					// [generatedForm]="generatedForm"
					labelPosition={labelPosition}
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
							onClick={() => navigateToStep(currentStep - 1)}
							customClass="form__button"
							type="primary"
							text="Next step"
						/>
					)}
					{showSubmitButton && isLastStep && (
						<OcButtonComponent
							onClick={onSubmit}
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
