import { normalizeTags } from '../../../../src/react-common-components/ui/form/molecules/oc-tags/utils';

describe('OcTags (utilities)', () => {
	it('normalizeTags - should transform string[] to number[] and return uniq', () => {
		const stringsArr: string[] = [ '1', '1', '2' ];
		const transformedArray = normalizeTags(stringsArr, 'number');

		expect(transformedArray).toEqual([ 1, 2 ]);
	});

	it('normalizeTags - should transform string[] to boolean[]', () => {
		const stringsArr: string[] = [ 'true', 'false' ];
		const transformedArray = normalizeTags(stringsArr, 'boolean');

		expect(transformedArray).toEqual([ true, false ]);

		const incorrectStringsArr: string[] = [ 'true', 'false', 'nan' ];
		const transformedArrayWithString = normalizeTags(incorrectStringsArr, 'boolean');

		expect(transformedArrayWithString).toEqual([ true, false, 'nan' ]);
	});

	it('normalizeTags - should return string[] as default', () => {
		const stringsArr: string[] = [ 'item', 'option' ];
		const transformedArray = normalizeTags(stringsArr, 'string');

		expect(transformedArray).toEqual(stringsArr);
	});
});
