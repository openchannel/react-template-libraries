import * as React from 'react';
import { useFormikContext } from 'formik';
import { ColorProps } from '../../../common';

import {
	OcDatetimePicker,
	OcVideoUrlComponent,
	OcSelect,
	OcRichTextEditorComponent,
	OcColorComponent,
	OcError,
	DatepickerProps,
	VideoUrlProps,
	OcSelectProps,
} from '../../../common';

import { OcTooltipLabel } from '../../atoms';
import { FIELD_TYPE } from '../../lib';
import {
	OcTags,
	OcTagsProps,
	OcMultiSelectList,
	OcMultiSelectListProps,
} from '../../molecules';
import { FCWP, FieldGroupProps } from './types';

export const FieldGroup: React.FC<FieldGroupProps & { error?: string }> = (props) => {
	const {
		children,
		error,
		label,
		labelFor,
		description,
		required,
	} = props;

	return (
		<>
			{label && (
				<div className="form__field-label">
					<OcTooltipLabel
						htmlFor={labelFor}
						required={required}
						description={description}
					>
						{label}
					</OcTooltipLabel>
				</div>
			)}
			<div className="form__field-input">
				{children}
			</div>
			{error && <OcError message={error} />}
		</>
	);
};

export const FieldGroupWrapper: React.FC<FieldGroupProps> = (props) => {
	const formik = useFormikContext();
	const { error, touched } = formik.getFieldMeta(props.name);

	return (
		<div className="form__field">
			<FieldGroup {...props} error={(touched && !!error && error) || ''} />
		</div>
	);
};

export const FormikOcColoWrapper: React.FC<FCWP<ColorProps['colorValue']>> = (
	{ field, form }
) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcColorComponent colorValue={field.value || ''} onValueChange={onChange} />
	);
};

export const FormikRichTextWrapper: React.FC<FCWP<string | undefined> & { placeholder: string }> = (
	{ field, form, placeholder }
) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcRichTextEditorComponent
			onChange={onChange}
			value={field.value}
			placeholderText={placeholder}
		/>
	);
};

export const FormikOcSelectWrapper: React.FC<FCWP<OcSelectProps['value'] | undefined> & { options: OcSelectProps['selectValArr'], placeholder: OcSelectProps['placeholder'] }> = (
	{ field, form, options, placeholder }
) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcSelect
			selectValArr={options}
			value={field.value}
			onSelectionChange={onChange}
			placeholder={placeholder}
		/>
	);
};

export const FormikOcTagsWrapper: React.FC<FCWP<OcTagsProps['value']> & {
	options: OcTagsProps['availableTags'],
	placeholder: OcTagsProps['placeholder'],
	tagsType: OcTagsProps['tagsType'],
}> = (
	{ field, form, options, placeholder, tagsType }
) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcTags
			availableTags={options}
			value={field.value}
			onChange={onChange}
			placeholder={placeholder}
			tagsType={tagsType}
		/>
	);
};

export const FormikOcVideoUrlWrapper: React.FC<FCWP<VideoUrlProps['value']> & {
	placeholder: VideoUrlProps['placeholder']
}> = ({ field, form, placeholder }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcVideoUrlComponent
			value={field.value || ''}
			onChange={onChange}
			placeholder={placeholder}
		/>
	);
};

export const FormikOcDatetimePickerWrapper: React.FC<FCWP<DatepickerProps['value']> & {
	type: DatepickerProps['type'], disabled: DatepickerProps['disabled']
}> = ({ field, form, type, disabled }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcDatetimePicker
			type={type}
			value={field.value}
			onChange={onChange}
			disabled={disabled}
			{...(type === FIELD_TYPE.DATE ? { settings: 'dd/MM/yyyy' } : {})}
		/>
	);
};

export const FormikOcMultiSelectListWrapper: React.FC<FCWP<OcMultiSelectListProps['value']> & {
	label: OcMultiSelectListProps['label'], options: OcMultiSelectListProps['availableItemsList']
}> = ({ field, form, label, options }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcMultiSelectList
			label={label}
			availableItemsList={options}
			value={field.value}
			onChange={onChange}
		/>
	);
};
