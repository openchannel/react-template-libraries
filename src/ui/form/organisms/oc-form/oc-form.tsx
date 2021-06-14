import * as React from 'react';
import { Form as FormikForm, FormikContext, useFormik } from 'formik';

import { OcButtonComponent } from '../../../common';
import { FormikFieldsValues } from '../../models';

import { OcFormContextProvider } from './context';
import { FormikMapFieldsWrapper } from './formik-map-field';

import './style.scss';
import { fieldsUtils } from './utils';

const getOcFormButtonsClass = (buttonPosition: string): string => {
	switch (buttonPosition) {
		case 'center':
			return 'form__buttons form__buttons_justify_center';
		case 'left':
			return 'form__buttons form__buttons_justify_start';
		default:
			return 'form__buttons form__buttons_justify_start form__buttons_direction_row_reverse';
	}
};

const useFormikValidation = () => {
	// const [validation, _setValidation] = React.useState(undefined);
	const [validators, _setValidators] = React.useState({});

	const setValidation = React.useCallback((fields) => {
		const newValidators = fieldsUtils.getFieldsValidation(fields);
		_setValidators(newValidators);
		// _setValidation(validators);
	}, []);

	const validation = React.useCallback((values: FormikFieldsValues) => {
		// let error = {};

		return Object.entries(values).reduce(
			(acc, [name, value]) => {
				const validator = validators[name];

				if (!validator) {
					return acc;
				}

				return {
					...acc,
					name: validator.map((validate) => validate(value)).filter(Boolean).map(error => errorMessages),
				};
			},
			{},
		);
	}, [validators])

	return {
		validation,
		setValidation,
	};
};

export const OcForm: React.FC<any> = (props) => {
	const { data, onSubmit, successButtonText = 'Submit', buttonPosition = 'left' } = props;

	const { validation, setValidation } = useFormikValidation();

	// console.log('validation', validation)

	const formik = useFormik({
		initialValues: {},
		onSubmit,
		validate: validation,
	});

	console.log('formik', formik.errors)

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ data, setValidation }}>
				<FormikForm className="form">
					<FormikMapFieldsWrapper />
					<div className={getOcFormButtonsClass(buttonPosition)}>
						<div className="form__button">
							<OcButtonComponent htmlType="submit" type="primary">
								{successButtonText}
							</OcButtonComponent>
						</div>
						<div className="form__button">
							<OcButtonComponent htmlType="button" type="secondary">
								Cancel
							</OcButtonComponent>
						</div>
					</div>
				</FormikForm>
			</OcFormContextProvider>
		</FormikContext.Provider>
	);
};
