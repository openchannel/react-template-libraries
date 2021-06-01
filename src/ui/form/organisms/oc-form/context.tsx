// @ts-nocheck

import * as React from 'react';

export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

const setFieldValueByName = (element, formikValues) => ({
	value: formikValues[element.name] ? formikValues[element.name] : element.value
});

const toggleFieldEditable = (element) => ({ isEditing: !element.isEditing });

const updateNestedFields = (element, formikValues) => {
	if (!element.fields) {
		return {};
	}

	return {
		fields: element.fields.map((f) => ({
			...f,
			...toggleFieldEditable(f),
			...setFieldValueByName(f, formikValues),
		}))
	};
}

const updateElement = (element, formikValues) => {
	return {
		...element,
		...toggleFieldEditable(element),
		...setFieldValueByName(element, formikValues),
		...updateNestedFields(element, formikValues),
	};
}

const updateFieldsDefinition = (arr: any[], fieldName: string, formikValues: any) => {
	return arr.map((element) => {
		if (element.name === fieldName) {
			return updateElement(element, formikValues);
		}

		if (element.fields) {
			return {
				...element,
				fields: updateFieldsDefinition(element.fields, fieldName, formikValues),
			};
		}

		return element;
	}, []);
}

export const OcFormContextProvider = ({ children, initialValue }) => {
	const [fieldsDefinition, setFieldsDefinition] = React.useState(initialValue.fields);

	const toggleEditingField = React.useCallback((formikValues, fieldName: string) => {
		setFieldsDefinition(prev => updateFieldsDefinition(prev, fieldName, formikValues));
	}, []);

	return (
		<OcFormContext.Provider value={{
			fieldsDefinition,
			toggleEditingField,
		}}>
			{children}
		</OcFormContext.Provider>
	)
}
