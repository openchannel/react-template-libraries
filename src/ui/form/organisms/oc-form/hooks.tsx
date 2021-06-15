import * as React from 'react';

import { AppFormModel, FieldValidators, FormikField, FormikFieldsValues } from '../../models';

import { validateOcFormValues } from './utils/common';
import { fieldsUtils, getValidParams } from './utils/fields';

const init = (initialFields?: FormikField[]) => {
	const { fields } = getValidParams(initialFields);

	return {
		validators: fieldsUtils.getValidators(fields),
		flattenFields: fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(fields), 0),
		fieldsDefinition: fieldsUtils.dumpDeepFields(fields),
	} as {
		validators: FieldValidators;
		flattenFields: FormikField[];
		fieldsDefinition: FormikField[];
	};
};

export const useOcFormState = (formJsonData: AppFormModel) => {
	const [state, setState] = React.useState(() => init(formJsonData.fields));

	const updateState = React.useCallback((normalizedFields) => {
		setState((prev) => ({
			...prev,
			validators: fieldsUtils.getValidators(normalizedFields),
			fieldsDefinition: normalizedFields,
		}));
	}, []);

	return { state, updateState };
};

export const useFormikValidation = (validators: FieldValidators) => {
	const validate = React.useCallback(
		(values: FormikFieldsValues) => validateOcFormValues(values, validators),
		[validators],
	);

	return { validate };
};
