import * as React from 'react';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import update from 'lodash/update';

import { FIELD_TYPE } from '../../lib';
import {
	updateFieldsDefinition,
	elementUtils,
	fieldsUtils,
	getValidParams,
	getInitialValuesFromFields,
	updateElementKeys,
	normalizeFieldsForFormik,
} from './utils';

export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

export const OcFormContextProvider = ({ children, initialValue }) => {
	const { fields } = React.useMemo(
		() => getValidParams(initialValue.data.fields),
		[initialValue.data.fields],
	);

	const [flattenFields] = React.useState(
		fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(fields), 0)
	);
	const [fieldsDefinition, setFieldsDefinition] = React.useState(
		fieldsUtils.dumpDeepFields(fields)
	);

	const formik = useFormikContext();

	const normalizeFieldsAndUpdateDefinition = React.useCallback((array) => {
		const newArray = normalizeFieldsForFormik(updateElementKeys)(array);

		setFieldsDefinition(newArray);
		formik.setValues(getInitialValuesFromFields(newArray));
	}, [formik.setValues]);

	const onAddDynamicField = (event) => {
		const elementStaticId = event.currentTarget.dataset.staticid;
		const elementPath = event.currentTarget.dataset.path;

		const instance = flattenFields.find(item => item.staticId === elementStaticId);
		const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);

		setFieldsDefinition(prev => {
			let next = [ ...prev ];
			const existedElement = get(next, elementPath);

			if (isFirstLevelDeep) {
				if (existedElement.fields.length === 0) {
					next[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
				} else {
					next.push(elementUtils.cloneAndUpdate(instance, true))
				}
			} else {
				next = update(prev, path, (fields) => {
					if (existedElement.fields.length === 0) {
						fields[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
					} else {
						fields.push(elementUtils.cloneAndUpdate(instance, true))
					}

					return fields;
				})
			}

			return normalizeFieldsForFormik(updateElementKeys)(next)
		});
	};

	const onRemoveDynamicField = React.useCallback((event) => {
		const elementPath = event.currentTarget.dataset.path;

		let next = [ ...fieldsDefinition ];
		const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);
		const existedElement = get(next, elementPath);

		if (isFirstLevelDeep) {
			const removeChildrenFields = next.length === 1;

			next = elementUtils.removeChildrenOrCurrent(next, existedElement, removeChildrenFields);
		} else {
			next = update(next, path, (fields) => {
				const removeChildrenFields = fields.filter(f => f.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY).length === 1;

				fields = elementUtils.removeChildrenOrCurrent(fields, existedElement, removeChildrenFields);

				return fields;
			});
		}

		normalizeFieldsAndUpdateDefinition(next);
	}, [fieldsDefinition, normalizeFieldsAndUpdateDefinition]);

	const onStartEditingField = React.useCallback((event) => {
		const fieldName = event.currentTarget.dataset.name;

		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				fields: prev,
				fieldName,
				isEditing: true,
			}),
		);
	}, []);

	const onCancelEditingField = (event) => {
		const elementPath = event.currentTarget.dataset.path;

		let next = [ ...fieldsDefinition ];
		const existedElement = get(next, elementPath);
		const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);

		next = elementUtils.updateFieldsValues(next, formik.values);

		if (isFirstLevelDeep) {
			if (existedElement.isNew) {
				const removeChildrenFields = next.length === 1;

				next = elementUtils.removeChildrenOrCurrent(next, existedElement, removeChildrenFields);
			} else {
				next = elementUtils.resetFieldValueToPreviousValue(next, existedElement);
			}
		} else {
			next = update(next, path, (fields) => {
				if (existedElement.isNew) {
					const removeChildrenFields = fields.filter(f => f.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY).length === 1;

					fields = elementUtils.removeChildrenOrCurrent(fields, existedElement, removeChildrenFields);
				} else {
					fields = elementUtils.resetFieldValueToPreviousValue(fields, existedElement);
				}

				return fields;
			});
		}

		normalizeFieldsAndUpdateDefinition(next);
	};

	const onSaveField = React.useCallback((event) => {
		const fieldName = event.currentTarget.dataset.name;

		setFieldsDefinition(prev =>
			updateFieldsDefinition({
				fields: prev,
				fieldName,
				formikValues: formik.values,
				isEditing: false,
			}),
		);
	}, []);

	return (
		<OcFormContext.Provider
			value={{
				fields: fieldsDefinition,
				onAddDynamicField,
				onRemoveDynamicField,
				onStartEditingField,
				onCancelEditingField,
				onSaveField,
			}}
		>
			{children}
		</OcFormContext.Provider>
	)
}
