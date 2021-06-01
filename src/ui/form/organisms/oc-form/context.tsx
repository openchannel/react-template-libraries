// @ts-nocheck

import * as React from 'react';

export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

const setFieldValueByName = (element, formikValues = null, isReset = false) => (
	isReset
		? { value: element.defaultValue || '' }
		: formikValues === null
		? {}
		: { value: formikValues[element.name] ? formikValues[element.name] : element.value }
);

const toggleFieldEditable = (element, isReset = false) => ({ isEditing: (isReset || !element.isEditing) });

const updateNestedFields = (element, formikValues, isReset) => {
	if (!element.fields) {
		return {};
	}

	return {
		fields: element.fields.map((f) => ({
			...f,
			...toggleFieldEditable(f, isReset),
			...setFieldValueByName(f, formikValues, isReset),
		}))
	};
}

const updateElement = (element, formikValues, isReset) => ({
	...element,
	...toggleFieldEditable(element, isReset),
	...setFieldValueByName(element, formikValues, isReset),
	...updateNestedFields(element, formikValues, isReset),
});

const updateFieldsDefinition = (arr: any[], fieldName: string, formikValues: any, isReset) => {
	return arr.map((element) => {
		if (element.name === fieldName) {
			return updateElement(element, formikValues, isReset);
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition(element.fields, fieldName, formikValues, isReset),
			};
		}

		return element;
	});
}

export const OcFormContextProvider = ({ children, initialValue }) => {
	const [fieldsDefinition, setFieldsDefinition] = React.useState(initialValue.fields);

	const toggleEditingField = React.useCallback((fieldName: string, formikValues) => {
		setFieldsDefinition(prev => updateFieldsDefinition(prev, fieldName, formikValues));
	}, []);

	const resetField = React.useCallback((fieldName) => {
		setFieldsDefinition(prev => updateFieldsDefinition(prev, fieldName, null, true));
	}, []);

	return (
		<OcFormContext.Provider value={{
			fieldsDefinition,
			toggleEditingField,
			resetField,
		}}>
			{children}
		</OcFormContext.Provider>
	)
}
