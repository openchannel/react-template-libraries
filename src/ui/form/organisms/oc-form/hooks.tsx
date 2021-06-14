import * as React from 'react';

import { FormikFieldsValues } from '../../models';

import { validateOcFormValues } from './utils/common';
import { fieldsUtils } from './utils/fields';

export const useFormikValidation = () => {
	const [validators, _setValidators] = React.useState<Record<string, any>>({});

	const setValidators = React.useCallback((fields) => {
		_setValidators(fieldsUtils.getValidators(fields));
	}, []);

	const validate = React.useCallback(
		(values: FormikFieldsValues) => validateOcFormValues(values, validators),
		[validators],
	);

	return {
		validate,
		setValidators,
	};
};
