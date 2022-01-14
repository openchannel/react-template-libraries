import { Option } from './oc-select';

export const transformToValidOptions = (array: Array<Option | string>, key = 'value', id = 'id'): Option[] =>
	array.reduce((acc, item) => {
		if (typeof item === 'object' && key !== 'value') {
			const newKeyValue = key === '' ? Object.values(item)[0] : item[key];
			const newIdValue = item[id] ? item[id] : Object.values(item)[0];

			acc.push({ [key]: newKeyValue, [id]: newIdValue});
		} else if (typeof item === 'object') {
			acc.push(item);
		} else {
			acc.push({ [key]: item, [id]: item });
		}
		return acc;
	}, [] as Option[]);
