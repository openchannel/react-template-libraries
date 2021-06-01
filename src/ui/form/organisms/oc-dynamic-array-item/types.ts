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

export interface OcDynamicArrayItemProps {
	/**
	 * Index of the current item.
	 * @default 0
	 */
	index: number;
	/**
	 * formFieldsData
	 */
	formFieldsData: any;
	/**
	 * ID of the form field which data will be set for array item label.
	 */
	fieldLabelId: string;
	/**
	 * Generated form for the item.
	 */
	dfaForm: any;

	currentFieldDefinition: AppTypeFieldModel;

}
