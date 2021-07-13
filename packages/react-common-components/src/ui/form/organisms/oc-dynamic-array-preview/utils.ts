import { FIELD_TYPE } from '../../lib';

export const isFileType = (type: string): boolean => {
	switch (type) {
		case FIELD_TYPE.MULTI_FILE:
		case FIELD_TYPE.MULTI_PRIVATE_FILE:
		case FIELD_TYPE.SINGLE_FILE:
		case FIELD_TYPE.PRIVATE_SINGLE_FILE:
			return true;
		default:
			return false;
	}
};

export const isValidDataForFieldType = (type: string, value: any): boolean => {
	switch (type) {
		case FIELD_TYPE.TEXT:
		case FIELD_TYPE.RICH_TEXT:
		case FIELD_TYPE.LONG_TEXT:
		case FIELD_TYPE.VIDEO_URL:
		case FIELD_TYPE.WEBSITE_URL:
		case FIELD_TYPE.EMAIL_ADDRESS:
		case FIELD_TYPE.SINGLE_IMAGE:
		case FIELD_TYPE.SINGLE_FILE:
		case FIELD_TYPE.PRIVATE_SINGLE_FILE:
		case FIELD_TYPE.COLOR:
		case FIELD_TYPE.DROPDOWN_LIST:
			return !value || typeof value === 'string';
		case FIELD_TYPE.NUMBER:
		case FIELD_TYPE.DATE:
		case FIELD_TYPE.DATE_TIME:
			return !value || typeof value === 'number';
		case FIELD_TYPE.MULTI_IMAGE:
		case FIELD_TYPE.MULTI_FILE:
		case FIELD_TYPE.MULTI_PRIVATE_FILE:
			return !value || (Array.isArray(value) && !value.find((url) => typeof url !== 'string'));
		case FIELD_TYPE.TAGS:
		case FIELD_TYPE.BOOLEAN_TAGS:
		case FIELD_TYPE.NUMBER_TAGS:
		case FIELD_TYPE.MULTISELECT_LIST:
			return !value || Array.isArray(value);
		case FIELD_TYPE.DYNAMIC_FIELD_ARRAY:
			return Array.isArray(value) && typeof value[0] === 'object';
		case FIELD_TYPE.CHECKBOX:
			return !value && typeof value === 'boolean';
		default:
			return false;
	}
};
