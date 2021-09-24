import * as React from 'react';
import { FieldInputProps, useFormikContext } from 'formik';
import moment from 'moment';

import { ColorProps, DatepickerProps, OcSelectProps, VideoUrlProps } from '../../../../common';
import OcColorComponent from '../../../../common/atoms/oc-color/oc-color';
import OcError from '../../../../common/atoms/oc-error/oc-error';
import OcFileUpload from '../../../../common/atoms/oc-file-upload/oc-file-upload';
import OcRichTextEditorComponent from '../../../../common/atoms/oc-rich-text-editor/oc-rich-text-editor';
import OcDatetimePicker from '../../../../common/molecules/oc-datetime-picker/oc-datetime';
import OcSelect from '../../../../common/molecules/oc-select/oc-select';
import OcVideoUrlComponent from '../../../../common/molecules/oc-video-url/oc-video-url';
import OcTooltipLabel from '../../../atoms/oc-tooltip-label/oc-tooltip-label';
import { FIELD_TYPE } from '../../../lib';
import { OcMultiSelectListProps, OcTagsProps } from '../../../molecules';
import OcMultiSelectList from '../../../molecules/oc-multi-select-list/oc-multi-select-list';
import OcTags from '../../../molecules/oc-tags/oc-tags';
import type { FCWP, FieldGroupProps } from '../types';
import { shouldFieldGroupUpdate, shouldFieldUpdate } from '../utils/memo';

export const FieldGroup: React.FC<FieldGroupProps & { error?: string }> = React.memo((props) => {
	const {children, error, label, labelFor, description, required} = props;

	return (
		<>
			{label && (
				<div className="form__field-label">
					<OcTooltipLabel htmlFor={labelFor} required={required} description={description}>
						{label}
					</OcTooltipLabel>
				</div>
			)}
			<div className="form__field-input">
				{error
					? (
						React.Children.map(children, child => React.isValidElement(child)
							? React.cloneElement(child, {
								customClass: child.props.customClass != null
									? child.props.customClass + ' invalid'
									: 'invalid'
							})
							: child))
					: children}
			</div>
			{error && <OcError message={error}/>}
		</>
	);
}, shouldFieldGroupUpdate);

export const FieldGroupWrapper: React.FC<FieldGroupProps> = (props) => {
	const { name } = props;
	const { getFieldMeta } = useFormikContext();
	const { error, touched } = getFieldMeta(name);

	return (
		<div className="form__field">
			<FieldGroup {...props} error={(touched && !!error && error) || ''} />
		</div>
	);
};

export const FormikOcColorWrapper: React.FC<FCWP<ColorProps['colorValue']>> = React.memo(
	({ field, form, customClass }) => {
		const onChange = React.useCallback(
			(value) => {
				form.setFieldValue(field.name, value);
			},
			[field.name, form.setFieldValue],
		);

		return (
			<OcColorComponent
				customClass={customClass}
				colorValue={field.value || ''}
				onValueChange={onChange}
				onBlur={field.onBlur}
				name={field.name}
			/>
		);
	},
	shouldFieldUpdate(),
);

export const FormikRichTextWrapper: React.FC<
	FCWP<string | undefined> & {
		placeholder?: string;
	}
> = React.memo(({ field, form, customClass, placeholder }) => {
	const onChange = React.useCallback(
		(value) => {
			form.setFieldValue(field.name, value);
		},
		[field.name, form.setFieldValue],
	);

	return (
		<OcRichTextEditorComponent
			name={field.name}
			customClass={customClass}
			onChange={onChange}
			value={field.value}
			placeholderText={placeholder}
			onBlur={field.onBlur}
		/>
	);
}, shouldFieldUpdate(['placeholder']));

export const FormikOcSelectWrapper: React.FC<
	FCWP<OcSelectProps['value'] | undefined> & {
		options: OcSelectProps['selectValArr'];
		placeholder?: OcSelectProps['placeholder'];
	}
> = React.memo(({ field, form, customClass, options, placeholder }) => {
	const onChange = React.useCallback(
		(value) => {
			form.setFieldValue(field.name, value);
		},
		[field.name, form.setFieldValue],
	);

	return (
		<OcSelect
			customClass={customClass}
			selectValArr={options}
			value={field.value}
			onSelectionChange={onChange}
			placeholder={placeholder}
		/>
	);
}, shouldFieldUpdate(['options', 'placeholder']));

export const FormikOcTagsWrapper: React.FC<
	FCWP<OcTagsProps['value']> & {
		options: OcTagsProps['availableTags'];
		placeholder?: OcTagsProps['placeholder'];
		tagsType?: OcTagsProps['tagsType'];
	}
> = React.memo(({ field, form, customClass, options, placeholder, tagsType }) => {
	const onChange = React.useCallback(
		(value) => {
			form.setFieldValue(field.name, value);
		},
		[field.name, form.setFieldValue],
	);

	return (
		<OcTags
			name={field.name}
			customClass={customClass}
			availableTags={options}
			value={field.value}
			onChange={onChange}
			placeholder={placeholder}
			tagsType={tagsType}
			onBlur={field.onBlur}
		/>
	);
}, shouldFieldUpdate(['options', 'placeholder', 'tagsType']));

export const FormikOcVideoUrlWrapper: React.FC<
	FCWP<VideoUrlProps['value']> & {
		placeholder?: VideoUrlProps['placeholder'];
	}
> = React.memo(({ field, form, customClass, placeholder }) => {
	const onChange = React.useCallback(
		(value) => {
			form.setFieldValue(field.name, value);
		},
		[form.setFieldValue],
	);

	return (
		<OcVideoUrlComponent
			name={field.name}
			customClass={customClass}
			value={field.value || ''}
			onChange={onChange}
			onBlur={field.onBlur}
			placeholder={placeholder}
		/>
	);
}, shouldFieldUpdate(['placeholder']));

export const FormikOcDatetimePickerWrapper: React.FC<
	FCWP<DatepickerProps['value']> & {
		type: DatepickerProps['type'];
		disabled?: DatepickerProps['disabled'];
	}
> = React.memo(
	({ field, form, customClass, type, disabled }) => {
		const onChange = React.useCallback(
			(value) => {
				form.setFieldValue(field.name, value);
			},
			[field.name, form.setFieldValue],
		);

		return (
			<OcDatetimePicker
				customClass={customClass}
				type={type}
				value={field.value}
				onChange={onChange}
				disabled={disabled}
				{...(type === FIELD_TYPE.DATE ? { settings: 'DD/MM/yyyy' } : {})}
			/>
		);
	},
	shouldFieldUpdate(
		['type', 'disabled'],
		(
			prevProps: Readonly<
				React.PropsWithChildren<{ field: FieldInputProps<string | moment.Moment> }>
			>,
			nextProps: Readonly<
				React.PropsWithChildren<{ field: FieldInputProps<string | moment.Moment> }>
			>,
		) => moment(prevProps.field.value).isSame(nextProps.field.value),
	),
);

export const FormikOcMultiSelectListWrapper: React.FC<
	FCWP<OcMultiSelectListProps['value']> & {
		label: OcMultiSelectListProps['label'];
		options: OcMultiSelectListProps['availableItemsList'];
	}
> = React.memo(({ field, form, customClass, label, options }) => {
	const onChange = React.useCallback(
		(value) => {
			form.setFieldValue(field.name, value);
		},
		[field.name, form.setFieldValue],
	);

	return (
		<OcMultiSelectList
			name={field.name}
			customClass={customClass}
			label={label}
			availableItemsList={options}
			value={field.value}
			onChange={onChange}
			onBlur={field.onBlur}
		/>
	);
}, shouldFieldUpdate(['options']));

export const FormikOcFileUploadWrapper: React.FC<any> = React.memo(({ acceptType, fileType }) => {
	return <OcFileUpload acceptType={acceptType} fileType={fileType} />;
});
