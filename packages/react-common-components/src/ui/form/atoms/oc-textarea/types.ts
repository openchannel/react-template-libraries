import * as React from 'react';

export interface OcTextareaProps {
	value: string;
	onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
	name?: string;
	/**
	 * Rows of textarea.
	 * @default 5
	 */
	rows?: number;
	/**
	 * Placeholder text.
	 */
	placeholder?: string;
	/**
	 * Add class list to the current class list.
	 * Required string with class names separated by space.
	 */
	customClass?: string;
	/**
	 * Disable field for user input.
	 * @default false
	 */
	disabled?: boolean;
	/**
	 * Set field required.
	 * @default false
	 */
	required?: boolean;
}
