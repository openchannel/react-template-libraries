import { Reducer, useCallback, useReducer } from 'react';
import _orderBy from 'lodash-es/orderBy';

const SET_ARRAY = 'SET_ARRAY';
const SORT_ARRAY = 'SORT_ARRAY';

type OrderBy = 'asc' | 'desc';
type Action<T> =
	| { type: typeof SET_ARRAY; payload: T[] }
	| { type: typeof SORT_ARRAY; payload: { key: string; orderBy?: OrderBy } };
interface AppState<T> {
	array: T[];
	sort: {
		key: string;
		orderBy: OrderBy;
	};
}

const initialState = <T>(initialSortKey: string): AppState<T> => ({
	array: [],
	sort: {
		key: initialSortKey,
		orderBy: 'asc',
	},
});

const reducer = <T>(state: AppState<T>, action: Action<T>): AppState<T> => {
	switch (action.type) {
		case SET_ARRAY: {
			return {
				...state,
				array: action.payload,
			};
		}
		case SORT_ARRAY: {
			const key = action.payload.key || state.sort.key;
			const orderBy = action.payload.orderBy || (state.sort.orderBy === 'asc' ? 'desc' : 'asc');

			return {
				array: _orderBy<T>(state.array, [key], [orderBy]),
				sort: { key, orderBy },
			};
		}
		default:
			return state;
	}
};

export const useSortingArray = <ArrayItemType>(initialSortKey: string) => {
	const [state, dispatch] = useReducer<Reducer<AppState<ArrayItemType>, Action<ArrayItemType>>>(
		reducer,
		initialState<ArrayItemType>(initialSortKey),
	);

	const setArray = useCallback((array: ArrayItemType[]) => {
		dispatch({ type: SET_ARRAY, payload: array });
	}, []);

	const sortArray = useCallback(({ key, orderBy }: { key: string; orderBy?: OrderBy }) => {
		dispatch({ type: SORT_ARRAY, payload: { key, orderBy } });
	}, []);

	return {
		state,
		setArray,
		sortArray,
	};
};
