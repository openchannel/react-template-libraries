import * as React from 'react';
import moment, { isMoment } from 'moment';

import FileIconSvg from '../../../../assets/img/file_icon.svg';
import { sanitizeHtml, stripHtmlTags } from '../../../../lib';
import { OcTagElement } from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { PreviewFieldModel } from '../../models';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';

export const FieldPreview: React.FC<PreviewFieldModel> = (field) => {
	const { type, groupFieldIndex, value } = field;

	// if (!isValidField) {
	// 	return (
	// 		<span className="array-preview__field-content__text">{stripHtmlTags(value)}</span>
	// 	);
	// }

	switch (type) {
		case FIELD_TYPE.DYNAMIC_FIELD_ARRAY: {
			return (
				<OcDynamicFieldArray
					field={field}
					showAddButton={false}
					groupFieldIndex={groupFieldIndex}
				/>
			);
		}
		case FIELD_TYPE.TAGS:
		case FIELD_TYPE.BOOLEAN_TAGS:
		case FIELD_TYPE.NUMBER_TAGS:
		case FIELD_TYPE.MULTISELECT_LIST: {
			if (!value?.length) {
				return null;
			}

			return (
				<div className="array-preview__field-content__tags">
					{value.map((tag: string | boolean | number) => (
						<div key={String(tag)} className="array-preview__field-content__tags-item">
							<OcTagElement title={String(tag)} />
						</div>
					))}
				</div>
			);
		}
		case FIELD_TYPE.RICH_TEXT: {
			return <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} />;
		}
		case FIELD_TYPE.SINGLE_IMAGE: {
			return (
				<div className="array-preview__field-content__image-mono">
					<img
						src={value}
						className="array-preview__field-content__image-mono-item"
						alt="Single file preview"
					/>
				</div>
			);
		}
		case FIELD_TYPE.MULTI_IMAGE: {
			if (!value?.length) {
				return null;
			}

			return (
				<div className="array-preview__field-content__image-multi">
					{value.map((src: string) => (
						<div key={src} className="array-preview__field-content__image-multi-container">
							<img
								src={src}
								className="array-preview__field-content__image-multi-item"
								alt="Multiple file preview"
							/>
						</div>
					))}
				</div>
			);
		}
		case FIELD_TYPE.CHECKBOX: {
			return <span className="array-preview__field-content__text">{value ? 'Yes' : 'No'}</span>;
		}
		case FIELD_TYPE.COLOR: {
			return (
				<span className="array-preview__field-content__text">
					<span
						className="array-preview__field-content__color"
						style={{ backgroundColor: value }}
					/>
				</span>
			);
		}
		case FIELD_TYPE.DROPDOWN_LIST: {
			return (
				<span className="array-preview__field-content__text">{stripHtmlTags(String(value))}</span>
			);
		}
		case FIELD_TYPE.DATE_TIME: {
			return (
				<span className="array-preview__field-content__text">
					{isMoment(value) ? moment(value).format('MMM D, Y HH:MM') : value}
				</span>
			);
		}
		case FIELD_TYPE.DATE: {
			return (
				<span className="array-preview__field-content__text">
					{isMoment(value) ? moment(value).format('MMM D, Y') : value}
				</span>
			);
		}
		case FIELD_TYPE.PRIVATE_SINGLE_FILE:
		case FIELD_TYPE.SINGLE_FILE: {
			return (
				<div className="array-preview__field-content__file-single-container">
					<div className="array-preview__field-content__file-single">
						{/*<img*/}
						{/*	className="array-preview__field-content__file-single-icon"*/}
						{/*	src="assets/angular-common-components/file_icon.svg"*/}
						{/*	alt="file image"*/}
						{/*/>*/}
						<FileIconSvg className="array-preview__field-content__file-single-icon" />
						<span className="array-preview__field-content__file-single-title">{value.name}</span>
					</div>
				</div>
			);
		}
		case FIELD_TYPE.MULTI_PRIVATE_FILE:
		case FIELD_TYPE.MULTI_FILE: {
			return (
				<div className="array-preview__field-content__file-multi">
					{value.map((item: any) => (
						<div key={item.name} className="array-preview__field-content__file-single">
							{/*<img*/}
							{/*	className="array-preview__field-content__file-single-icon"*/}
							{/*	src="assets/angular-common-components/file_icon.svg"*/}
							{/*	alt="file image"*/}
							{/*/>*/}
							<FileIconSvg className="array-preview__field-content__file-single-icon" />
							<span className="array-preview__field-content__file-single-title">{item.name}</span>
						</div>
					))}
				</div>
			);
		}
		default:
			return (
				<span className="array-preview__field-content__text">{stripHtmlTags(String(value))}</span>
			);
	}
};
