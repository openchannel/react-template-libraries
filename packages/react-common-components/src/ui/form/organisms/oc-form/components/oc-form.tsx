import * as React from 'react';

import OcSelect from '../../../../common/molecules/oc-select';
import OcTooltipLabel from '../../../atoms/oc-tooltip-label';

import { getDefaultFormType } from '../utils/common';
import { mapConfigsToFormConfigs, mapFormTypes } from '../utils/config-mapper';
import { OcFormFormikHelpers, OcFormProps, OcFormValues, SelectedFormType } from '../types';
import '../style.scss';

import { Form } from './form';

export const OcForm: React.FC<OcFormProps> = (props) => {
	const {
		formJsonData,
		formConfigs = [],
		formTypeLabel = 'Type',
		defaultFormType,
		onSubmit,
		children,
		enablePasswordField = false,
		enableTermsCheckboxField = false,
		excludeRenderFields,
		...formProps
	} = props;

	const [formType, setFormType] = React.useState<SelectedFormType>(
		() => getDefaultFormType(mapFormTypes(formConfigs).options, defaultFormType)
	);

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
					excludeRenderFields={excludeRenderFields}
					formJsonData={selectedFormConfig}
					onSubmit={onFormSubmit}
				>
					{children}
				</Form>
			)}
		</>
	);
};
