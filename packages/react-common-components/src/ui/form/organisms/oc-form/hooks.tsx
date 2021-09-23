import * as React from 'react';
import { FormikValues } from 'formik';

import {
	AppFormField,
	AppFormModel,
	FieldValidators,
	FormikField
} from '../../models';

import { fieldsUtils, getInitialFieldsAndValues } from './utils/fields';

const init = (
	fields?: AppFormField[],
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
