//@ts-nocheck
import * as React from 'react';
import includes from 'lodash/includes';
import { useFormikContext } from 'formik';

import { OcButtonComponent } from '../../../common';
import { FIELD_TYPE } from '../../lib';
import { OcDynamicArrayItem } from '../oc-dynamic-array-item';
import TrashIconSvg from '../../../../assets/img/trash-icon.svg';
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
	const { element, fields, fieldsDefinition } = props;

	const formik = useFormikContext();
	const { value } = formik.getFieldMeta(element.name);

	const context = useOcFormContext();

	console.log('context', context)

	// console.log('OcDynamicFieldArray formik.values', formik.values)
	// console.log('OcDynamicFieldArray element', element)
	// console.log('OcDynamicFieldArray fields', fields);

	const addDynamicFieldToFormikValues = () => {
		console.log('element', element.name)
		context.fillDynamicField(element.name);
		// context.
		// formik.setValues({
		// 	...formik.values,
		// 	// [fields[0].name]: fields[0].value,
		// 	...fields.reduce((acc, item) => {
		// 		if (item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY) {
		// 			return acc;
		// 		}
		//
		// 		acc[item.name] = item.value;
		//
		// 		return acc;
		// 	}, {}),
		// });
	}

	const removeDynamicFieldFromFormikValues = () => {
		const values = Object.entries(formik.values).reduce((acc, item) => {
			if (!item[0].includes(element.name)) {
				acc[item[0]] = item[1];
			}
			return acc;
		}, {});

		formik.setValues(values);

		context.resetField(element.name);
	}

	const onSaveField = React.useCallback((event: React.SyntheticEvent) => {
		context.toggleEditingField(event.target.id, formik.values);
	}, [formik.values, context.toggleEditingField]);

	// console.log('formik.values', formik.values)
	// console.log('Object.keys(formik.values)', Object.keys(formik.values))
	// console.log('fields', fields)

	return (
		<div className="cards-interface">
			{
				fields && fields.length > 0 && (
					<div key={fields.id} className="cards-interface__added-item">
						{
							!element.isEditing ? (
								<OcDynamicArrayItem
									elementName={element.name}
									fields={fields}
									fieldLabel={getFieldLabel(element, formik.values) || `Item ${0 + 1}`}
									onDelete={removeDynamicFieldFromFormikValues}
								/>
							) : (
								<div className="cards-interface__preview">
									<div className="cards-interface__preview-header">
										<h3 className="cards-interface__preview-header-text">
											{getFieldLabel(element, formik.values) || `Item ${0 + 1}`}
										</h3>
										<div className="cards-interface__preview-icon">
											<TrashIconSvg onClick={removeDynamicFieldFromFormikValues} />
										</div>
									</div>

									<div className="cards-interface__preview-content">
										{/*<RecursiveContainer fields={fields} />*/}
										{fields.map((element) => <FieldDeterminant key={element.name} {...element} />)}
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
				)
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
