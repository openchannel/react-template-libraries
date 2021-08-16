import { Option } from '@openchannel/react-common-components/src/ui';

import { transformToValidOptions } from '../../../../src/ui/common/molecules/oc-select/utils';

describe('OcSelect (utilities)', () => {
	const defaultArrayOfStrings: string[] = [ 'option 1', 'option 2' ];
	const defaultArrayOfObjects: Option[] = [ { value: 'option 1' }, { value: 'option 2' } ];

	it('should transform array from an array of strings', () => {
		const transformedArray = transformToValidOptions(defaultArrayOfStrings);

		expect(transformedArray).toEqual([ { value: 'option 1' }, { value: 'option 2' } ]);
	});

	it('should transform array from an array of strings with custom key', () => {
		const transformedArray = transformToValidOptions(defaultArrayOfStrings, 'customKey');

		expect(transformedArray).toEqual([ { customKey: 'option 1' }, { customKey: 'option 2' } ]);
	});

	it('should transform array from an array of objects', () => {
		const transformedArray = transformToValidOptions(defaultArrayOfObjects);

		expect(transformedArray).toEqual([ { value: 'option 1' }, { value: 'option 2' } ]);
	});

	it('should transform array from an array of objects and with custom key', () => {
		const transformedArray = transformToValidOptions(defaultArrayOfObjects, 'anotherKey');

		expect(transformedArray).toEqual([ { anotherKey: 'option 1' }, { anotherKey: 'option 2' } ]);
	});
});
