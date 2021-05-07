import * as React from 'react';

import { chartReducer, chartInitialState, SET_TABLE_DATA, UPDATE_SORT } from './utils';


export const useChartReducer = () => {
	const [state, dispatch] = React.useReducer(chartReducer, chartInitialState)

	const setTableData = React.useCallback((chartData) => {
		const tableData = chartData.data.tabularLabels.map((label, i) => ({
			label,
			value: chartData.data.labelsY[i],
		}))

		dispatch({ type: SET_TABLE_DATA, payload: tableData })
	}, [dispatch])

	const sortTableData = React.useCallback(({ key, orderBy }) => {
		dispatch({ type: UPDATE_SORT, payload: { key, orderBy } })
	}, [dispatch])

	return {
		state,
		setTableData,
		sortTableData,
	}
}
