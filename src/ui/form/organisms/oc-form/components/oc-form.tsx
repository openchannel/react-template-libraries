import * as React from 'react';
import { Form as FormikForm, FormikContext, useFormik } from 'formik';

import { OcButtonComponent } from '../../../../common';
import { OcFormContextProvider } from '../context';
import { useFormikValidation } from '../hooks';
import { getOcFormButtonsClass } from '../utils/common';

import { FormikMapFieldsWrapper } from './formik-map-field';

import '../style.scss';

export const OcForm: React.FC<any> = (props) => {
	const { data, onSubmit, successButtonText = 'Submit', buttonPosition = 'left' } = props;

	const { validate, setValidators } = useFormikValidation();

	const formik = useFormik({
		initialValues: {},
		onSubmit,
		validate,
	});

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ data, setValidators }}>
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
