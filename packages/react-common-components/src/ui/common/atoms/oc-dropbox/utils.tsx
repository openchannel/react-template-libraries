import { DropboxValue } from './index';

export const transformToValidOptions = (
	array: Array<DropboxValue>,
): { label: string; value: string }[] => {
	return (array || []).map((item) => ({ label: item, value: item }));
};
