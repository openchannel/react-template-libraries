import _orderBy from 'lodash/orderBy';

import { ChartAction, ChartReducer } from './types';

export const SET_TABLE_DATA = 'SET_TABLE_DATA';
export const UPDATE_SORT = 'UPDATE_SORT';

export const chartInitialState = {
	tableData: [],
	sort: {
		key: 'label',
		orderBy: 'asc',
	},
};

export const chartReducer = (state: ChartReducer, action: ChartAction): ChartReducer => {
	switch (action.type) {
		case SET_TABLE_DATA: {
			return {
				...state,
				tableData: action.payload,
			};
		}
		case UPDATE_SORT: {
			const key = action.payload.key || state.sort.key;
			const orderBy = action.payload.orderBy || (state.sort.orderBy === 'asc' ? 'desc' : 'asc');

			return {
				tableData: _orderBy(state.tableData, [key], [orderBy]),
				sort: {
					key,
					orderBy,
				},
			};
		}
		default:
			return state;
	}
};
