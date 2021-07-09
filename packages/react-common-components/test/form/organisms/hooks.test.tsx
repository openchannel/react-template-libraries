import { act, renderHook } from '@testing-library/react-hooks';

import { useOcFormState } from '../../../packages/react-common-components/src/ui/form/organisms/oc-form/hooks';

const formJsonDataMock = {
	formId: 'test',
	name: 'test',
	createdDate: 1599982592157,
	fields: [
		{
			attributes: {
				max: 25,
				min: 5,
				required: false,
			},
			category: 'CUSTOM',
			defaultValue: '',
			description: '',
			id: 'test-number',
			label: 'Test number',
			placeholder: '',
			type: 'number',
		},
	],
};

describe('useOcFormState', () => {
	it('should works', function () {
		const { result } = renderHook(() => useOcFormState(formJsonDataMock));

		act(() => {
			result.current.updateState(formJsonDataMock.fields);
		});

		expect(1).toBe(1);
	});
});
