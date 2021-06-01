import * as React from 'react';
import includes from 'lodash/includes';
import { useFormikContext } from 'formik';

import { OcButtonComponent } from '../../../common';
import { OcDynamicArrayItem } from '../oc-dynamic-array-item';
import TrashIconSvg from '../../../../assets/img/trash-icon.svg';
import { RecursiveContainer } from '../oc-form';
import { useOcFormContext } from '../oc-form/context';

import { OcDynamicFieldArrayProps } from './types';

import './style.scss';

export const OcDynamicFieldArray: React.FC<OcDynamicFieldArrayProps> = (props) => {
	const { element, fields, fieldsDefinition } = props;

	const formik = useFormikContext();
	const { value } = formik.getFieldMeta(element.name);

	const addDynamicFieldToFormikValues = () => {
		formik.setValues({ ...formik.values, [fields[0].name]: fields[0].value });
	}

	const removeDynamicFieldFromFormikValues = () => {
		const values = Object.entries(formik.values).reduce((acc, item) => {
			if (!item[0].includes(element.name)) {
				acc[item[0]] = item[1];
			}
			return acc;
		}, {});

		formik.setValues(values);
	}

	const context = useOcFormContext();

	console.log('context', context)

	const onSaveField = React.useCallback((event: React.SyntheticEvent) => {
		context.toggleEditingField(event.target.id, formik.values);
	}, [formik.values, context.toggleEditingField]);

	return (
		<div className="cards-interface">
			{
				fields && fields.length > 0 && fields.map((field, k) => (
					!includes(Object.keys(formik.values), field.name) ? null :
						<div className="cards-interface__added-item">
							{
								!field.isEditing ? (
									<OcDynamicArrayItem fields={fields} />
								) : (
									<div className="cards-interface__preview">
										<div className="cards-interface__preview-header">
											<h3 className="cards-interface__preview-header-text">
												{field.attributes.rowLabel || `Item ${(k + 1)}` }
											</h3>
											<div className="cards-interface__preview-icon">
												<TrashIconSvg onClick={removeDynamicFieldFromFormikValues} />
											</div>
										</div>
										<div className="cards-interface__preview-content">
											<RecursiveContainer fields={fields} />
										</div>
										<div className="cards-interface__preview-buttons">
											<div className="cards-interface__preview-buttons-cancel">
												<OcButtonComponent
													htmlType="button"
													type="secondary"
													onClick={() => alert('cancelArrayItemAdding')}
												>
													Cancel
												</OcButtonComponent>
											</div>
											<div className="cards-interface__preview-buttons-save">
												<OcButtonComponent
													id={element.name}
													htmlType="button"
													type="primary"
													onClick={onSaveField}
												>
													Save
												</OcButtonComponent>
											</div>
										</div>
									</div>
								)
							}
						</div>
				))
			}
			<div className="cards-interface__add-btn">
				<OcButtonComponent
					htmlType="button"
					type="primary"
					onClick={addDynamicFieldToFormikValues}
				>
					Add
				</OcButtonComponent>
			</div>
		</div>
	);
}
