import * as React from 'react';
import { FormikValues } from 'formik';

import { AppFormModel, FieldValidators, FormikField, FormikFieldsValues } from '../../models';

import { validateOcFormValues } from './utils/common';
import { fieldsUtils, getInitialFieldsAndValues } from './utils/fields';

const init = (
	fields?: FormikField[],
): {
	validators: FieldValidators;
	flattenFields: FormikField[];
	fieldsDefinition: FormikField[];
	initialValues: FormikValues;
} => {
	const { initialFields, initialValues } = getInitialFieldsAndValues(fields);

	return {
		validators: fieldsUtils.getValidators(initialFields || []),
		flattenFields: fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(initialFields || []), 0),
		fieldsDefinition: fieldsUtils.dumpDeepFields(initialFields || []),
		initialValues,
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
