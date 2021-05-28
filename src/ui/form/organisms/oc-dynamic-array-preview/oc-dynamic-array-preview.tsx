import * as React from 'react';

import { OcLabelComponent } from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { PreviewFieldModel } from '../../models';

import { FieldPreview } from './field-preview';
import { OcDynamicArrayPreviewProps } from './types';

import './style.scss';

const isValidDataForFieldType = (type: string, fieldValue: any) => {
	switch (type) {
		case FIELD_TYPE.TEXT:
		case FIELD_TYPE.RICH_TEXT:
		case FIELD_TYPE.LONG_TEXT:
		case FIELD_TYPE.VIDEO_URL:
		case FIELD_TYPE.WEBSITE_URL:
		case FIELD_TYPE.EMAIL_ADDRESS:
		case FIELD_TYPE.SINGLE_IMAGE:
			return !fieldValue || typeof fieldValue === 'string';
		case FIELD_TYPE.NUMBER:
			return !fieldValue || typeof fieldValue === 'number';
		case FIELD_TYPE.MULTI_IMAGE:
			return !fieldValue || (Array.isArray(fieldValue) && !(fieldValue as []).find(url => typeof url !== 'string'));
		case FIELD_TYPE.TAGS:
		case FIELD_TYPE.BOOLEAN_TAGS:
		case FIELD_TYPE.NUMBER_TAGS:
			return !fieldValue || Array.isArray(fieldValue);
		case FIELD_TYPE.DYNAMIC_FIELD_ARRAY:
			return Array.isArray(fieldValue) && typeof fieldValue[0] === 'object';
		default:
			return false;
	}
}

export const OcDynamicArrayPreview: React.FC<OcDynamicArrayPreviewProps> = (props) => {
	const { fieldDefinition, fieldValues } = props;

	const previewFields = React.useMemo(() => {
		if (!fieldDefinition?.fields || fieldDefinition.fields.length === 0) {
			return [];
		}

		return fieldDefinition.fields.map((field) => {
			const result: PreviewFieldModel = {
				isValidField: false,
				fieldValue: null,
				formArrayDFA: null,
				...field,
			};

			if (fieldValues?.length > 0) {
				result.fieldValue = fieldValues.find(v => v.fieldId === field.id)?.fieldValue;
			}

			result.isValidField = isValidDataForFieldType(field.type, result.fieldValue);

			// if (result.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			// result.formArrayDFA = this.dfaForm.get(result.id) as FormArray;
			// }

			return result;
		});
	}, [fieldDefinition.fields, fieldValues]);

	return (
		<div className="array-preview">
			{
				previewFields.length > 0 && previewFields.map((field) => (
					<div className="array-preview__field">
						<span className="array-preview__field-title">
							<OcLabelComponent>{field.label}</OcLabelComponent>
						</span>
						<div className="array-preview__field-content">
							<FieldPreview {...field} />
						</div>
					</div>
				))
			}
		</div>
	)
};
