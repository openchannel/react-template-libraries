import * as React from 'react';


export const OcFormContext = React.createContext({});

export const useOcFormContext = () => {
	return React.useContext(OcFormContext);
}

const toggleFields = (arr: any[], fieldName: string, formikValues: any) => {
	return arr.map((element) => {
		if (element.name === fieldName) {
			return {
				...element,
				value: formikValues[element.name] ? formikValues[element.name] : element.value,
				isEditing: !element.isEditing,
				...(element.fields ? { fields: element.fields.map((f) => ({ ...f, isEditing: false })) } : {}),
			}
		}

		return {
			...element,
			...(element.fields ? { fields: toggleFields(element.fields, fieldName, formikValues) } : {}),
		}
	}, []);
}

export const OcFormContextProvider = ({ children, initialValue }) => {
	const [fieldsDefinition, setFieldsDefinition] = React.useState(initialValue.fields);

	const toggleEditingField = React.useCallback((formikValues, fieldName: string) => {
		setFieldsDefinition(prev => toggleFields(prev, fieldName, formikValues));
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
