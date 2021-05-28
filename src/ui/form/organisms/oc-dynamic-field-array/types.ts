export interface AppTypeOptionModel {
	value: string;
}

export interface AppTypeFieldModel {
	id: string;
	label: string;
	type: string;
	attributes?: any;
	description?: string;
	fields?: AppTypeFieldModel[];
	subFieldDefinitions?: AppTypeFieldModel[];
	defaultValue?: any;
	placeholder?: string;
	options?: AppTypeOptionModel[] | string[];
	specialType?: string;
}

export interface OcDynamicFieldArrayProps {
	/** Fields definition config necessary for the DFA generation */
	fieldDefinitionData: AppTypeFieldModel;
	/** Generated Form Array for the DFA */
	dfaFormArray: any[];
}
