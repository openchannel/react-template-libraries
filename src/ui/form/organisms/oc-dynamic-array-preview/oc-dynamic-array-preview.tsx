import { useFormikContext } from 'formik';
import * as React from 'react';

import { OcLabelComponent } from '../../../common';
import { PreviewFieldModel } from '../../models';

import { FieldPreview } from './field-preview';
import { OcDynamicArrayPreviewProps } from './types';

import './style.scss';


export const OcDynamicArrayPreview: React.FC<OcDynamicArrayPreviewProps> = (props) => {
	const { fields, hideLabel = false } = props;

	const formik = useFormikContext();

	const previewFields = React.useMemo(() => {
		if (!fields || fields.length === 0) {
			return [];
		}

		return fields.map((field) => {
			const { value, error, touched } = formik.getFieldMeta(field.name);

			const result: PreviewFieldModel = {
				...field,
				fieldValue: null,
				isValidField: false,
				formArrayDFA: null,
				value,
			};

			// result.isValidField = isValidDataForFieldType(field.type, result.fieldValue);

			// if (result.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
			// result.formArrayDFA = this.dfaForm.get(result.id) as FormArray;
			// }

			return result;
		});
	}, [formik, fields]);

	console.log('previewFields', previewFields)

	return (
		<div className="array-preview">
			{
				previewFields.map((element) => (
					<div className="array-preview__field">
						<span className="array-preview__field-title">
							{!hideLabel && <OcLabelComponent>{element.label}</OcLabelComponent>}
						</span>
						<div className="array-preview__field-content">
							<FieldPreview {...element} />
						</div>
					</div>
				))
			}
		</div>
	)
};
