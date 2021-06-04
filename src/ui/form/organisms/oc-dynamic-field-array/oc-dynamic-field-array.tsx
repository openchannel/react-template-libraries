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
	const { element, fieldsDefinition, showAddButton } = props;

	const formik = useFormikContext();
	const { value } = formik.getFieldMeta(element.name);

	const context = useOcFormContext();


	// console.log('OcDynamicFieldArray formik.values', formik.values)
	// console.log('OcDynamicFieldArray element', element)
	// console.log('OcDynamicFieldArray fields', fields);

	const addDynamicFieldToFormikValues = () => {
		context.fillDynamicField(element.staticId, element.path);
	}

	const removeDynamicFieldFromFormikValues = () => {
		// const values = Object.entries(formik.values).reduce((acc, item) => {
		// 	if (!item[0].includes(element.name)) {
		// 		acc[item[0]] = item[1];
		// 	}
		// 	return acc;
		// }, {});
		//
		// formik.setValues(values);
		//
		// context.resetField(element.name);
	}

	const onStartEditing = () => {
		context.startFieldEditing(element.name);
	}

	const onSaveField = (event: React.SyntheticEvent) => {
		context.stopFieldEditing(event.target.name);
	}

	const onCancelFields = React.useCallback((event: React.SyntheticEvent) => {
		context.stopFieldEditing(event.target.id);
	}, [formik.values, context.stopFieldEditing]);


	return (
		<div className="cards-interface">
			{
				element.fields && element.fields.length > 0 && (
					<div className="cards-interface__added-item">

						<div className="cards-interface__preview">
							<div className="cards-interface__preview-header">
								<h3 className="cards-interface__preview-header-text">
									{getFieldLabel(element, formik.values) || `Item ${0 + 1}`}
								</h3>

								<div className="cards-interface__icons-handler">
									{
										!element.isEditing && (
											<div className="cards-interface__preview-icon" onClick={onStartEditing}>
												<EditIconSvg />
											</div>
										)
									}
									<div className="cards-interface__preview-icon" onClick={removeDynamicFieldFromFormikValues}>
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
													name={element.name}
													htmlType="button"
													type="secondary"
													onClick={onCancelFields}
												>
													Cancel
												</OcButtonComponent>
											</div>
											<div className="cards-interface__preview-buttons-save">
												<OcButtonComponent
													name={element.name}
													htmlType="button"
													type="primary"
													onClick={onSaveField}
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
						htmlType="button"
						type="primary"
						onClick={addDynamicFieldToFormikValues}
					>
						Add
					</OcButtonComponent>
				</div>
			)}
		</div>
	);
}
