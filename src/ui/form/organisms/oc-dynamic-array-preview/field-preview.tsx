import * as React from 'react';

import { sanitizeHtml, stripHtmlTags } from '../../../../lib';
import { OcTagElement } from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { PreviewFieldModel } from '../../models';
import { OcDynamicFieldArray } from '../oc-dynamic-field-array';

export const FieldPreview: React.FC<PreviewFieldModel> = (element) => {
	const { type, isValidField, value, formArrayDFA } = element;

	console.log('element', element)

	// if (!isValidField) {
	// 	return (
	// 		<span className="array-preview__field-content__text">{stripHtmlTags(value)}</span>
	// 	);
	// }

	switch (type) {
		case FIELD_TYPE.DYNAMIC_FIELD_ARRAY: {
			return (
				<OcDynamicFieldArray element={element} fields={element.fields} />
			);
		}
		case FIELD_TYPE.TAGS:
		case FIELD_TYPE.BOOLEAN_TAGS:
		case FIELD_TYPE.NUMBER_TAGS: {
			if (!value?.length) {
				return null;
			}

			return (
				<div className="array-preview__field-content__tags">
					{
						value.map((tag) => (
							<div key={tag} className="array-preview__field-content__tags-item">
								<OcTagElement title={tag} />
							</div>
						))
					}
				</div>
			);
		}
		case FIELD_TYPE.RICH_TEXT: {
			return (
				<div dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} />
			);
		}
		case FIELD_TYPE.SINGLE_IMAGE: {
			return (
				<div className="array-preview__field-content__image-mono">
					<img src={value} className="array-preview__field-content__image-mono-item" alt="image" />
				</div>
			);
		}
		case FIELD_TYPE.MULTI_IMAGE: {
			if (!value?.length) {
				return null;
			}

			return (
				<div className="array-preview__field-content__image-multi">
					{
						value.map((src) => (
							<div className="array-preview__field-content__image-multi-container">
								<img src={src} className="array-preview__field-content__image-multi-item" alt="image" />
							</div>
						))
					}
				</div>
			);
		}
		default:
			return (
				<span className="array-preview__field-content__text">{stripHtmlTags(value)}</span>
			);
	}
}
