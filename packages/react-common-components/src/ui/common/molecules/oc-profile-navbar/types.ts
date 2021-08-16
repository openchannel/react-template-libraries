export class DropdownModel<T> {
	/**
	 * Dropdown item label
	 */
	label: string;

	/**
	 * Dropdown item value with provided in generic type
	 */
	value: T;

	constructor(label: string, value: T) {
		this.label = label;
		this.value = value;
	}
}
