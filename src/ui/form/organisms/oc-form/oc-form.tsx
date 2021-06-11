import * as React from 'react';
import { Form as FormikForm, FormikContext, useFormik } from 'formik';

import { OcButtonComponent } from '../../../common';

import { OcFormContextProvider } from './context';
import { FormikMapFieldsWrapper } from './formik-map-field';

import './style.scss';

const getOcFormButtonsClass = (buttonPosition: string): string => {
	switch (buttonPosition) {
		case 'center':
			return `form__buttons form__buttons_justify_center`;
		case 'left':
			return `form__buttons form__buttons_justify_start`;
		default:
			return `form__buttons form__buttons_justify_start form__buttons_direction_row_reverse`;
	}
};

export const OcForm: React.FC<any> = (props) => {
	const { data, onSubmit, successButtonText = 'Submit', buttonPosition = 'left' } = props;

	const formik = useFormik({
		initialValues: {},
		onSubmit,
	});

	return (
		<FormikContext.Provider value={formik}>
			<OcFormContextProvider initialValue={{ data }}>
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
