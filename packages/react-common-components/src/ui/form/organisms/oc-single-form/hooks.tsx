import * as React from 'react';

import { AppFormField, AppFormModel } from '../../models';

import { fieldsUtils, getInitialFieldsAndValues } from './utils/fields';
import { OcFormState } from './types';

const init = (formId = '', fields: AppFormField[] | undefined): OcFormState => {
	const { initialFields, initialValues } = getInitialFieldsAndValues(fields);

	return {
		formId,
		validators: fieldsUtils.getValidators(initialFields || []),
		flattenFields: fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(initialFields || []), 0),
		fieldsDefinition: fieldsUtils.dumpDeepFields(initialFields || []),
		initialValues,
	};
};

export const useOcFormState = (formJsonData: AppFormModel) => {
	const [state, setState] = React.useState<OcFormState>(() =>
		init(formJsonData.formId, formJsonData.fields),
	);

	React.useEffect(() => {
		if (formJsonData.formId !== state.formId) {
			setState(init(formJsonData.formId, formJsonData.fields));
		}
	}, [formJsonData]);

	const updateState = React.useCallback((normalizedFields) => {
		setState((prev) => ({
			...prev,
			validators: fieldsUtils.getValidators(normalizedFields),
			fieldsDefinition: normalizedFields,
		}));
	}, []);

	return { state, updateState };
};
