import { chartReducer, chartInitialState, UPDATE_SORT } from '../../../src/ui/portal/organisms/chart/chart-state'


describe('Chart (chart-state)', () => {
	it('should return default state', () => {
		const action = { type: 'ANOTHER_TYPE', payload: null };

		expect(chartReducer(chartInitialState, action)).toStrictEqual(chartInitialState);
	});

	it('should return sort by "orderBy" param only', () => {
		const action = { type: UPDATE_SORT, payload: { orderBy: 'desc' } };

		expect(chartReducer(chartInitialState, action)).toStrictEqual({
			...chartInitialState,
			sort: {
				key: chartInitialState.sort.key,
				orderBy: 'desc',
			},
		});
	});
});
