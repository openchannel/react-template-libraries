export interface OptionValue {
	value: any;
}

export interface TypeFieldModel {
	id: string;
	type: string;
	label?: string;
	defaultValue?: any;
	attributes?: any;
	options?: Array<OptionValue | string>;
	fields?: TypeFieldModel[];
}

export interface TypeModel<T extends TypeFieldModel> {
	fields?: T[];
}
