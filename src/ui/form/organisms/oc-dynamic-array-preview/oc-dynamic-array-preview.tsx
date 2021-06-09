import * as React from 'react';

import { OcLabelComponent } from '../../../common';
import { PreviewFieldModel } from '../../models';

import { FieldPreview } from './field-preview';
import { OcDynamicArrayPreviewProps } from './types';

import './style.scss';


export const OcDynamicArrayPreview: React.FC<OcDynamicArrayPreviewProps> = (props) => {
	const { fields, hideLabel = false } = props;

	const previewFields = React.useMemo(() => {
		if (!fields || fields.length === 0) {
			return [];
		}

		return fields.map((field) => {
			const result: PreviewFieldModel = {
				...field,
				fieldValue: null,
				isValidField: false,
				formArrayDFA: null,
				groupFieldIndex: 0,
			};

			// result.isValidField = isValidDataForFieldType(field.type, result.fieldValue);

			// if (result.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			// result.formArrayDFA = this.dfaForm.get(result.id) as FormArray;
			// }

			return result;
		});
	}, [fields]);

	return (
		<div className="array-preview">
			{
				previewFields.map((field, index) => (
					<div key={field.name} className="array-preview__field">
						<span className="array-preview__field-title">
							{!hideLabel && <OcLabelComponent>{field.label}</OcLabelComponent>}
						</span>
						<div className="array-preview__field-content">
							<FieldPreview {...field} groupFieldIndex={index} />
						</div>
					</div>
				))
			}
		</div>
	);
};
