import * as React from 'react';

import { FIELD_TYPE } from '../../lib';
import { AppFormField, AppFormModel } from '../../models';
import { FormProgressbarStep } from './oc-form-progress-bar/oc-form-progress-bar';

import { FieldStep } from './types';

export const createStepsFromJSON = (data: AppFormModel | undefined): FieldStep[] => {
	const formsArray: FieldStep[] = [];
	const currentFreeFieldsStep: FieldStep = {
		items: [],
	};

	(data?.fields || []).forEach((field, index) => {
		if (field.type === FIELD_TYPE.FIELD_GROUP) {
			if (currentFreeFieldsStep.items && currentFreeFieldsStep.items.length > 0) {
				formsArray.push({ ...currentFreeFieldsStep });
				currentFreeFieldsStep.items = [];
			}

			const step: FieldStep = {
				label: field,
				items: (data?.fields || []).filter(
					(item) => item.attributes?.group === field.id.replace('customData.', ''),
				),
			};

			if (step.items?.length) {
				formsArray.push(step);
			}
		} else {
			if (!field.attributes?.group) {
				currentFreeFieldsStep.items?.push(field);

				if (data?.fields && index === data?.fields?.length - 1) {
					formsArray.push(currentFreeFieldsStep);
				}
			}
		}
	});

	return formsArray.map((form, index) => ({
		...form,
		items: form?.items?.map((item: AppFormField) => ({ ...item, step: index })),
	}));
};

export const reGenerateProgressbar = (
	customForm: FieldStep[] | any,
	formik: any,
	setProgressBarSteps: React.Dispatch<any>,
	currentStep: number,
	createInitialProgressBar: (customForm: FieldStep[] | null) => FormProgressbarStep[],
): void => {
	const stepErrors: any = [];
	const stepFinished: any = {};
	customForm?.length > 0 &&
		customForm?.forEach((_step: FieldStep, index: number) => {
			customForm[index].items.forEach((field: any) => {
				formik.errors[field.name] &&
					formik.touched[field.name] &&
					formik.errors[field.name]?.length > 0 &&
					stepErrors.push({ name: field.name, step: currentStep });

				if (!formik.errors[field.name] && formik.touched[field.name]) {
					stepFinished[index + 1] = {
						fields: [
							...(stepFinished[index + 1]?.fields ? stepFinished[index + 1]?.fields : []),
							field?.name,
						],
					};
				}
			});
		});
	const copy = createInitialProgressBar(customForm);

	customForm?.forEach((form: any, index: number) => {
		loop1: for (const field of form?.items!) {
			for (const err of stepErrors) {
				if (field.name === err.name) {
					copy[field?.step].state = 'invalid';
					break loop1;
				} else {
					copy[field.step].state = 'pristine';
				}
			}
			const isStepFinished = form?.items?.every((field: AppFormField) =>
				stepFinished[index + 1]?.fields?.includes(field?.name),
			);
			if (isStepFinished) {
				copy[field.step].state = 'finished';
			}
		}
	});

	setProgressBarSteps(copy);
};

export const createInitialProgressBar = (customForm: FieldStep[] | null): FormProgressbarStep[] =>
	customForm !== null && customForm.length > 1
		? customForm?.map((step: FieldStep, index: number) => ({
				title: step.label ? step.label.label : `Step ${index + 1}`,
				state: 'pristine',
		  }))
		: [];
