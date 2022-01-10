import { FormikValues } from 'formik';
import { isBoolean } from 'lodash-es';
import { nanoid } from 'nanoid';

import { FIELD_TYPE, getFieldValidators } from '../../../lib';
import { AppFormField, FormikField, FormikFieldsValues } from '../../../models';

// replace dot to prevent nesting path in names
const getNewName = (element: AppFormField): string =>
	`${element.id.replaceAll('.', '#')}-${nanoid()}`;
const toBoolean = (value?: any) => (value === 'false' ? false : Boolean(value));

export const extendElementWithRequiredKeys = (
	element: AppFormField,
	{ path, index }: { path: string; index: number },
) => ({
	...element,
	index,
	path,
	staticId: nanoid(), // use as unique non-updatable element id
	name: getNewName(element),
	value: isBoolean(element.defaultValue)
		? toBoolean(element.defaultValue)
		: element.defaultValue || '',
	previousValue: isBoolean(element.defaultValue)
		? toBoolean(element.defaultValue)
		: element.defaultValue || '',
	isEditing: true,
	isNew: true,
});

export const updateElementKeys = (
	element: AppFormField,
	{ path, index }: { path: string; index: number },
) => ({
	...element,
	index,
	path,
});

// eslint-disable-next-line
export const normalizeFieldsForFormik =
	(todo: Function) =>
	(fields: Array<AppFormField | FormikField>, deepPath?: string): FormikField[] => {
		return fields.map((field: AppFormField | FormikField, index: number) => {
			const path: string = deepPath ? `${deepPath}.fields.${index}` : `${index}`;

			if (field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && field.fields) {
				return {
					...todo(field, { path, index }),
					fields: normalizeFieldsForFormik(todo)(field.fields, path),
				};
			}

			return todo(field, { path, index });
		});
	};

export const getInitialValuesFromFields = (fields: FormikField[]): { [key: string]: any } => {
	return fields.reduce(
		(acc, field) =>
			field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && field.fields
				? { ...acc, ...getInitialValuesFromFields(field.fields) }
				: { ...acc, [field.name]: field.value },
		{},
	);
};

export const getInitialFieldsAndValues = (
	fields?: AppFormField[],
): {
	initialFields: FormikField[];
	initialValues: FormikValues;
} => {
	if (!fields) return { initialFields: [], initialValues: {} };

	const extendedFields = normalizeFieldsForFormik(extendElementWithRequiredKeys)(fields);

	return {
		initialFields: extendedFields,
		initialValues: getInitialValuesFromFields(extendedFields),
	};
};

export const setFieldValueByName = ({
	element,
	formikValues,
}: {
	element: FormikField;
	formikValues?: FormikFieldsValues;
}) =>
	!formikValues
		? {}
		: {
				value: formikValues[element.name] ? formikValues[element.name] : element.value,
				previousValue:
					(formikValues[element.name] ? formikValues[element.name] : element.value) ||
					element.defaultValue ||
					'',
		  };

export const setFieldEditable = ({ isEditing }: { isEditing: boolean }) => ({ isEditing });

export const updateNestedFields = (params: {
	element: FormikField;
	formikValues?: FormikFieldsValues;
	isEditing: boolean;
}): { fields?: FormikField[] } => {
	if (!params.element.fields) {
		return {};
	}

	return {
		fields: params.element.fields.map((f) => ({
			...f,
			...setFieldEditable(params),
			...setFieldValueByName({ ...params, element: f }),
			...updateNestedFields({ ...params, element: f }),
		})),
	};
};

export const updateElement = (params: {
	element: FormikField;
	formikValues?: FormikFieldsValues;
	isEditing: boolean;
}) => ({
	...params.element,
	isNew: false,
	...setFieldEditable(params),
	...setFieldValueByName(params),
	...updateNestedFields(params),
});

export const updateFieldsDefinition = (params: {
	fields: FormikField[];
	formikValues?: FormikFieldsValues;
	fieldName: string;
	isEditing: boolean;
}): FormikField[] => {
	return params.fields.map((element) => {
		if (element.name === params.fieldName) {
			return updateElement({
				element,
				formikValues: params.formikValues,
				isEditing: params.isEditing,
			});
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition({ ...params, fields: element.fields }),
			};
		}

		return element;
	});
};

export const fieldsUtils = {
	flatMap: (arr: FormikField[]): FormikField[] =>
		arr.reduce(
			(acc, item) =>
				item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && item.fields
					? [...acc, item, ...fieldsUtils.flatMap(item.fields)]
					: [...acc, item],
			[] as FormikField[],
		),
	dumpDeepFields: (arr: FormikField[], depth = 1): FormikField[] =>
		arr.map((item) => {
			if (item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && item.fields) {
				if (depth !== 0) {
					return { ...item, fields: [] };
				}
				return { ...item, fields: fieldsUtils.dumpDeepFields(item.fields, depth + 1) };
			}
			return item;
		}),
	getValidators: (fields: FormikField[]): any =>
		fields.reduce((acc, field) => {
			if (field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && field.fields) {
				return { ...acc, ...getFieldValidators(field), ...fieldsUtils.getValidators(field.fields) };
			}
			return { ...acc, ...getFieldValidators(field) };
		}, {}),
};

export const elementUtils = {
	getParentPath: (path: string) => {
		const modified = path.substring(0, path.lastIndexOf('.'));

		return {
			original: path,
			path: modified,
			isFirstLevelDeep: modified.length <= 1,
			depth: path.split('.').length - 1,
		};
	},
	updateNestedFields: (field: FormikField): Record<string, never> | { fields: FormikField[] } =>
		field.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY && field.fields
			? { fields: field.fields.map((el) => ({ ...elementUtils.cloneAndUpdate(el) })) }
			: {},
	cloneAndUpdate: (element: FormikField, isNew = false, args?: Record<string, any>) => ({
		...element,
		...elementUtils.updateNestedFields(element),
		name: getNewName(element),
		value: element.defaultValue || '',
		previousValue: element.defaultValue || '',
		isEditing: true,
		isNew,
		...args,
	}),
	removeChildOrCurrent: (arr: FormikField[], field: FormikField, isChildren = false) => {
		const updatedArr = [...arr];

		if (isChildren) {
			updatedArr[field.index] = {
				...field,
				isEditing: false,
				fields: [],
			};
		} else {
			updatedArr.splice(field.index, 1);
		}

		return updatedArr;
	},
	resetFieldValueToPreviousValue: (arr: FormikField[], field: FormikField) => {
		arr[field.index] = {
			...field,
			value: field.previousValue,
			isEditing: false,
			fields:
				field.fields &&
				field.fields.map((el) => ({ ...el, value: el.previousValue, isEditing: false })),
		};

		return arr;
	},
	setFieldValue: (field: FormikField, newValue: any) => ({
		...field,
		value: newValue,
		previousValue: newValue || field.value || field.defaultValue || '',
	}),
	updateFieldsValues: (arr: FormikField[], formikValues: FormikFieldsValues): FormikField[] => {
		if (!formikValues) return arr;

		return arr.map((element) => {
			if (formikValues[element.name]) {
				return elementUtils.setFieldValue(element, formikValues[element.name]);
			}

			if (element.fields) {
				return {
					...element,
					fields: elementUtils.updateFieldsValues(element.fields, formikValues),
				};
			}

			return element;
		});
	},
};


export const setFormChildes = (flattenFields: FormikField[], childInstance: FormikField, value: any) => {
	const childDefValues = value[childInstance.id];
	return (childDefValues && childDefValues.map((elem: any) => {

		const fieldsWithDefValuesChild = childInstance.fields!.map((child: FormikField) => {
			const nextChild = flattenFields.find((item) => item.id === child.id && item.type === FIELD_TYPE.DYNAMIC_FIELD_ARRAY);
			
			return elementUtils.cloneAndUpdate(
				child,
				false,
				{ 
					previousValue: elem[child.id] ? elem[child.id] : '', 
					value: elem[child.id] ? elem[child.id] : '', 
					isEditing: false,
					fields: nextChild ? setFormChildes(flattenFields, nextChild, elem) : [],
				},
			);
		});

		return elementUtils.cloneAndUpdate(
			childInstance,
			false,
			{ fields: fieldsWithDefValuesChild.flat(), isEditing: false },
		);
	}));
};
