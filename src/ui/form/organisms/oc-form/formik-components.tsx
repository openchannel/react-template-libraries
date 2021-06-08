import * as React from 'react';
import { useFormikContext } from 'formik';

import {
	OcDatetimePicker,
	OcVideoUrlComponent,
	OcSelect,
	OcRichTextEditorComponent,
	OcColorComponent,
	OcError,
} from '../../../common';

import { OcTooltipLabel } from '../../atoms';
import { FIELD_TYPE } from '../../lib';
import { OcMultiSelectList } from '../../molecules/oc-multi-select-list';
import { OcTags } from '../../molecules/oc-tags';

export const FieldGroup = (props: any) => {
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

export const FieldGroupWrapper = (props) => {
	const formik = useFormikContext();
	const { error, touched } = formik.getFieldMeta(props.name);

	return (
		<div className="form__field">
			<FieldGroup {...props} error={touched && !!error && error} />
		</div>
	);
};

export const FormikFieldWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcColorComponent colorValue={field.value} onValueChange={onChange} />
	)
}

export const FormikRichTextWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcRichTextEditorComponent
			onChange={onChange}
			value={field.value}
			placeholderText={props.placeholder}
		/>
	);
};

export const FormikOcSelectWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcSelect
			selectValArr={props.options}
			value={field.value}
			onSelectionChange={onChange}
			placeholder={props.placeholder}
		/>
	);
};

export const FormikOcTagsWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcTags
			availableTags={props.options}
			value={field.value}
			onChange={onChange}
			placeholder={props.placeholder}
			tagsType={props.tagsType}
		/>
	);
};

export const FormikOcVideoUrlWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcVideoUrlComponent
			value={field.value}
			onChange={onChange}
			placeholder={props.placeholder}
		/>
	);
};

export const FormikOcDatetimePickerWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcDatetimePicker
			type={props.type}
			value={field.value}
			onChange={onChange}
			disabled={props.disabled}
			{...(props.type === FIELD_TYPE.DATE ? { settings: 'dd/MM/yyyy' } : {})}
		/>
	);
};

export const FormikOcMultiSelectListWrapper = ({ field, form, ...props }) => {
	const onChange = React.useCallback((value) => {
		form.setFieldValue(field.name, value);
	}, [form.setFieldValue]);

	return (
		<OcMultiSelectList
			label={props.label}
			availableItemsList={props.options}
			value={field.value}
			onChange={onChange}
		/>
	);
};
