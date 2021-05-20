export type OcTagsValue = Array<string | number | boolean>;

export interface OcTagsProps {
	/**
	 * Placeholder.
	 */
	placeholder?: string;
	/**
	 * It is list tags for the dropbox. Users can choice tags of this list.
	 * When this list is empty dropbox not shows.
	 */
	availableTags?: OcTagsValue;
	/**
	 * Set type of tags values.
	 * Can be 'string', 'boolean' or 'number'.
	 * @default string
	 */
	tagsType?: 'string' | 'boolean' | 'number';
	/**
	 * List of selected tags.
	 */
	value: OcTagsValue;
	/**
	 * Return array of selected items.
	 * @param v
	 */
	onChange: (v: OcTagsValue) => void;
}

export interface NormalizeTags {
	(array: string[], type: 'string' | 'boolean' | 'number'): OcTagsValue;
}

export interface UseCreatableState {
	({ createTag }: { createTag: (s: string) => void } ): {
		inputValue: string;
		resetInputValue: () => void;
		onInputChange: (inputValue: any, { action }: any) => void;
		onKeyDown: (event: any) => void;
	}
}
