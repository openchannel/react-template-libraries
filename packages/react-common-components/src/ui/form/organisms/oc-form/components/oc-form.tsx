import * as React from 'react';

import OcSelect from '../../../../common/molecules/oc-select';
import OcTooltipLabel from '../../../atoms/oc-tooltip-label';

import { mapConfigsToFormConfigs, mapFormTypes } from '../utils/config-mapper';
import { OcFormFormikHelpers, OcFormProps, OcFormValues, SelectedFormType } from '../types';
import '../style.scss';

import { Form } from './form';

// const AgreeWithTermsCheckbox = ({ formikProps, formFields, customTermsDescription, ordinaryTermsDescription }: any) => {
// 	const { values, touched, errors, handleBlur, handleChange } = formikProps;
//
// 	const termsName = formFields.find((f) => f.id === 'terms')!.name;
//
// 	return (
// 		<>
// 			<div className="edit-user-form__content__checkbox">
// 				{customTermsDescription && (
// 					<div className="edit-user-form__content__label">
// 						{customTermsDescription}
// 					</div>
// 				)}
// 				<OcCheckboxComponent
// 					labelText={ordinaryTermsDescription}
// 					name={termsName}
// 					checked={values[termsName]}
// 					touched={String(touched[termsName])}
// 					onBlur={handleBlur}
// 					onChange={handleChange}
// 				/>
// 			</div>
// 			{touched[termsName] && errors[termsName] && (
// 				<OcError message="Please confirm this checkbox" />
// 			)}
// 		</>
// 	);
// };

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		formConfigs = [],
		formTypeLabel = 'Type',
		onSubmit,
		children,
		enablePasswordField = false,
		enableTermsCheckboxField = false,
		...formProps
	} = props;

	const [formType, setFormType] = React.useState<SelectedFormType>(() => mapFormTypes(formConfigs).options[0]);

	const { configs, formTypes, formTypeOptions } = React.useMemo(() => {
		const { types, options } = mapFormTypes(formConfigs);

		return {
			formTypes: types,
			formTypeOptions: options,
			configs: mapConfigsToFormConfigs(formConfigs, enablePasswordField, enableTermsCheckboxField),
		};
	}, [formConfigs, enablePasswordField, enableTermsCheckboxField]);

	const onChangeFormType = React.useCallback((formType: SelectedFormType) => {
		setFormType((prev) => prev.label !== formType.label ? formType : prev);
	}, []);

	const onFormSubmit = (values: OcFormValues, formikProps: OcFormFormikHelpers) => {
		if (!onSubmit) {
			return;
		}

		// write additional data to submit payload
		let info: { formType?: string; } = {};
		if (formTypes.length > 0) {
			// write selected formType
			info.formType = formTypes.find((ft) => ft.label === formType.label)!.value;
		}

		onSubmit({ ...values, info }, formikProps);
	};

	// use formJsonData if it was passed in props or display selected form config
	const selectedFormConfig = formJsonData || configs.find((c) => c.name === formType?.label);

	return (
		<>
			{formConfigs?.length > 1 && (
				<>
					<OcTooltipLabel text={formTypeLabel} labelClass="edit-user-form__type-label" />
					<OcSelect
						value={formType}
						selectValArr={formTypeOptions}
						onSelectionChange={onChangeFormType}
						labelField="label"
					/>
				</>
			)}
			{selectedFormConfig && (
				<Form
					{...formProps}
					formJsonData={selectedFormConfig}
					onSubmit={onFormSubmit}
				>
					{children}
					{/*{enableTermsCheckbox && (*/}
					{/*	(formikProps, formFields) => <AgreeWithTermsCheckbox*/}
					{/*		formikProps={formikProps}*/}
					{/*		formFields={formFields}*/}
					{/*		customTermsDescription={customTermsDescription}*/}
					{/*		ordinaryTermsDescription={ordinaryTermsDescription}*/}
					{/*	/>*/}
					{/*)}*/}
				</Form>
			)}
		</>
	);
};
