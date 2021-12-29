import { AppFormModel } from '../../models/app-form';
import { FieldStep } from './types';

export const createStepsFromJSON = (data: AppFormModel | undefined): FieldStep[] => {
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
