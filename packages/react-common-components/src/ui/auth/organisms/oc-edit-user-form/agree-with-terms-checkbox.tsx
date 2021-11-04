import * as React from 'react';
import { FormikProps } from 'formik';

import { OcError } from '../../../common/atoms/oc-error';
import { OcCheckboxComponent } from '../../../common/atoms/oc-checkbox';
import { FormikField } from '../../../form/models';

interface AgreeWithTermsCheckboxProps {
	formikProps: FormikProps<any>;
	formFields: FormikField[];
	customTermsDescription?: React.ReactNode;
	ordinaryTermsDescription?: React.ReactNode;
}

export const AgreeWithTermsCheckbox: React.FC<AgreeWithTermsCheckboxProps> = (props) => {
	const {
		formikProps: {
			values, touched, errors, handleBlur, handleChange,
		},
		formFields,
		customTermsDescription,
		ordinaryTermsDescription,
	} = props;

	const termsField = React.useMemo(() => formFields.find((f) => f.id === 'terms'), [formFields]);

	if (!termsField) {
		console.error('Not Found field with id "terms" to display checkbox')
		return null;
	}

	return (
		<>
			<div className="edit-user-form__content__checkbox">
				{customTermsDescription && (
					<div className="edit-user-form__content__label">
						{customTermsDescription}
					</div>
				)}
				<OcCheckboxComponent
					labelText={ordinaryTermsDescription}
					name={termsField.name}
					checked={values[termsField.name]}
					touched={String(touched[termsField.name])}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
			</div>
			{touched[termsField.name] && errors[termsField.name] && (
				<OcError message="Please confirm this checkbox" />
			)}
		</>
	);
};
