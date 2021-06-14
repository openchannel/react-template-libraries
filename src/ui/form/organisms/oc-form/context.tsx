import * as React from 'react';
import { useFormikContext } from 'formik';
import get from 'lodash/get';
import update from 'lodash/update';

import { Dataset } from '../../../common/atoms/oc-button';
import { FIELD_TYPE } from '../../lib';
import { FormikField, FormikFieldsValues } from '../../models';

import { noop } from './utils/common';
import {
	elementUtils,
	fieldsUtils,
	getInitialValuesFromFields,
	getValidParams,
	normalizeFieldsForFormik,
	updateElementKeys,
	updateFieldsDefinition,
} from './utils/fields';
import { OcFormContextProps, OcFormContextProviderProps } from './types';

export const OcFormContext = React.createContext<OcFormContextProps>({
	fields: [],
	onAddDynamicField: noop,
	onRemoveDynamicField: noop,
	onStartEditingField: noop,
	onCancelEditingField: noop,
	onSaveField: noop,
});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
};

export const OcFormContextProvider: React.FC<OcFormContextProviderProps> = ({
	children,
	initialValue: { data, setValidators },
}) => {
	const { fields } = React.useMemo(() => getValidParams(data.fields), [data.fields]);

	const [flattenFields] = React.useState(
		fieldsUtils.dumpDeepFields(fieldsUtils.flatMap(fields), 0),
	);
	const [fieldsDefinition, setFieldsDefinition] = React.useState(
		fieldsUtils.dumpDeepFields(fields),
	);

	const { values, setValues } = useFormikContext<FormikFieldsValues>();

	React.useEffect(() => {
		setValidators(fieldsDefinition);
	}, []);

	const normalizeFieldsAndUpdateDefinition = React.useCallback(
		(array) => {
			const newArray = normalizeFieldsForFormik(updateElementKeys)(array);

			setFieldsDefinition(newArray);
			setValidators(newArray);
			setValues(getInitialValuesFromFields(newArray));
		},
		[setValues, setValidators],
	);

	const onAddDynamicField = React.useCallback(
		(event: React.MouseEvent) => {
			const button = event.target as HTMLButtonElement;
			const elementStaticId = button.dataset.staticid || '';
			const elementPath = button.dataset.path || '';

			const instance = flattenFields.find((item) => item.staticId === elementStaticId);
			if (!instance) return;

			let next = [...fieldsDefinition];
			const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);
			const existedElement = get(next, elementPath);

			if (isFirstLevelDeep) {
				if (existedElement.fields && existedElement.fields.length === 0) {
					next[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
				} else {
					next.push(elementUtils.cloneAndUpdate(instance, true));
				}
			} else {
				next = update(fieldsDefinition, path, (fields) => {
					if (existedElement.fields && existedElement.fields.length === 0) {
						fields[existedElement.index] = elementUtils.cloneAndUpdate(instance, true);
					} else {
						fields.push(elementUtils.cloneAndUpdate(instance, true));
					}

					return fields;
				});
			}

			normalizeFieldsAndUpdateDefinition(next);
		},
		[fieldsDefinition, normalizeFieldsAndUpdateDefinition],
	);

	const onRemoveDynamicField = React.useCallback(
		(event: React.SyntheticEvent<Dataset>) => {
			const elementPath = event.currentTarget.dataset.path;

			let next = [...fieldsDefinition];
			const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);
			const existedElement = get(next, elementPath);

			if (isFirstLevelDeep) {
				const removeChildrenFields = next.length === 1;

				next = elementUtils.removeChildrenOrCurrent(next, existedElement, removeChildrenFields);
			} else {
				next = update(next, path, (fields: FormikField[]) => {
					const removeChildrenFields =
						fields.filter((f) => f.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY).length === 1;

					fields = elementUtils.removeChildrenOrCurrent(
						fields,
						existedElement,
						removeChildrenFields,
					);

					return fields;
				});
			}

			normalizeFieldsAndUpdateDefinition(next);
		},
		[fieldsDefinition, normalizeFieldsAndUpdateDefinition],
	);

	const onStartEditingField = React.useCallback((event: React.SyntheticEvent<Dataset>) => {
		const fieldName = event.currentTarget.dataset.name;

		setFieldsDefinition((prev) =>
			updateFieldsDefinition({
				fields: prev,
				fieldName,
				isEditing: true,
			}),
		);
	}, []);

	const onCancelEditingField = (event: React.MouseEvent) => {
		const button = event.target as HTMLButtonElement;
		const elementPath = button.dataset.path || '';

		let next = [...fieldsDefinition];
		const existedElement = get(next, elementPath);
		const { path, isFirstLevelDeep } = elementUtils.getParentPath(elementPath);

		next = elementUtils.updateFieldsValues(next, values);

		if (isFirstLevelDeep) {
			if (existedElement.isNew) {
				const removeChildrenFields = next.length === 1;

				next = elementUtils.removeChildrenOrCurrent(next, existedElement, removeChildrenFields);
			} else {
				next = elementUtils.resetFieldValueToPreviousValue(next, existedElement);
			}
		} else {
			next = update(next, path, (fields: FormikField[]) => {
				if (existedElement.isNew) {
					const removeChildrenFields =
						fields.filter((f) => f.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY).length === 1;

					fields = elementUtils.removeChildrenOrCurrent(
						fields,
						existedElement,
						removeChildrenFields,
					);
				} else {
					fields = elementUtils.resetFieldValueToPreviousValue(fields, existedElement);
				}

				return fields;
			});
		}

		normalizeFieldsAndUpdateDefinition(next);
	};

	const onSaveField = React.useCallback(
		(event) => {
			const fieldName = event.currentTarget.dataset.name;

			setFieldsDefinition((prev) =>
				updateFieldsDefinition({
					fields: prev,
					fieldName,
					formikValues: values,
					isEditing: false,
				}),
			);
		},
		[values],
	);

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
	);
};
