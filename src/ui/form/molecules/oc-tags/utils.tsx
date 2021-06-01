import uniq from 'lodash/uniq';

import { NormalizeTags } from './types';

export const normalizeTags: NormalizeTags = (array, type) => {
	return uniq(
		array.map((item) => {
			switch (type) {
				case 'number': {
					return isNaN(Number(item)) ? item : Number(item);
				}
				case 'boolean': {
					try {
						return JSON.parse(item);
					} catch {
						return item.trim();
					}
				}
				default:
					return item.trim();
			}
		}),
	);
};
