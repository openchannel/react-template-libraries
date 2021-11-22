export interface TypeModel<T extends TypeFieldModel> {
	fields?: T[];
}

export interface TypeFieldModel {
	placeholder?: string;
	name?: string;
	description?: string;
	id: string;
	type: string;
	label?: string;
	defaultValue?: any;
	attributes?: any;
	options?: Array<OptionValue | string>;
	fields?: TypeFieldModel[];
}

export interface OptionValue {
	value: any;
}
