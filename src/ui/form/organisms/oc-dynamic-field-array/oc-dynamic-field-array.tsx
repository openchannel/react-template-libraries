//@ts-nocheck
import * as React from 'react';
import includes from 'lodash/includes';
import { useFormikContext } from 'formik';

import { OcButtonComponent } from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicArrayItem } from '../oc-dynamic-array-item';
import EditIconSvg from '../../../../assets/img/edit.svg';
import TrashIconSvg from '../../../../assets/img/trash-icon.svg';
import { OcDynamicArrayPreview } from '../oc-dynamic-array-preview';
import { FieldDeterminant } from '../oc-form';
import { RecursiveContainer } from '../oc-form';
import { useOcFormContext } from '../oc-form/context';

import { OcDynamicFieldArrayProps } from './types';

import './style.scss';


const getFieldLabel = (element, formikValues) => {
	if (!element.attributes.rowLabel) return '';

	const rowLabel = element.fields.find(f => f.id === element.attributes.rowLabel);
	if (!rowLabel) return '';

	const item: string[] | undefined = Object.entries(formikValues)
	.find(([key, value]) => key.includes(element.attributes.rowLabel) && value);

	return item ? item[1] : '';
};

export const OcDynamicFieldArray: React.FC<OcDynamicFieldArrayProps> = (props) => {
	const { element, showAddButton, groupFieldIndex } = props;

	const formik = useFormikContext();
	const context = useOcFormContext();

	return (
		<div className="cards-interface">
			{
				element.fields && element.fields.length > 0 && (
					<div className="cards-interface__added-item">
						<div className="cards-interface__preview">
							<div className="cards-interface__preview-header">
								<h3 className="cards-interface__preview-header-text">
									{getFieldLabel(element, formik.values) || `Item ${groupFieldIndex + 1}`}
								</h3>
								<div className="cards-interface__icons-handler">
									{
										!element.isEditing && (
											<div
												data-name={element.name}
												data-index={element.index}
												data-path={element.path}
												onClick={context.onStartEditingField}
												className="cards-interface__preview-icon"
											>
												<EditIconSvg />
											</div>
										)
									}
									<div
										data-name={element.name}
										data-index={element.index}
										data-path={element.path}
										className="cards-interface__preview-icon"
										onClick={context.onRemoveDynamicField}
									>
										<TrashIconSvg />
									</div>
								</div>
							</div>
							{
								!element.isEditing ? (
									<div className="cards-interface__preview-content">
										<OcDynamicArrayPreview
											// elementName={element.name}
											fields={element.fields}
											// fieldLabel={getFieldLabel(element, formik.values) || `Item ${0 + 1}`}
											// onDelete={removeDynamicFieldFromFormikValues}
										/>
									</div>
								) : (
									<>
										<div className="cards-interface__preview-content">
											<RecursiveContainer fields={element.fields} />
										</div>
										<div className="cards-interface__preview-buttons">
											<div className="cards-interface__preview-buttons-cancel">
												<OcButtonComponent
													data-name={element.name}
													data-index={element.index}
													data-path={element.path}
													htmlType="button"
													type="secondary"
													onClick={context.onCancelEditingField}
												>
													Cancel
												</OcButtonComponent>
											</div>
											<div className="cards-interface__preview-buttons-save">
												<OcButtonComponent
													data-name={element.name}
													data-index={element.index}
													data-path={element.path}
													htmlType="button"
													type="primary"
													onClick={context.onSaveField}
												>
													Save
												</OcButtonComponent>
											</div>
										</div>
									</>
								)
							}
						</div>
					</div>
				)
			}
			{showAddButton && (
				<div className="cards-interface__add-btn">
					<OcButtonComponent
						data-name={element.name}
						data-index={element.index}
						data-path={element.path}
						data-staticid={element.staticId}
						htmlType="button"
						type="primary"
						onClick={context.onAddDynamicField}
					>
						Add
					</OcButtonComponent>
				</div>
			)}
		</div>
	);
}
