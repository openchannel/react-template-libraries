import * as React from 'react';

import { chartReducer, chartInitialState, SET_TABLE_DATA, UPDATE_SORT } from './chart-state';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChartReducer = () => {
	const [state, dispatch] = React.useReducer(chartReducer, chartInitialState)

	const setTableData = React.useCallback((chartData) => {
		const tableData = chartData.data.tabularLabels.map((label: string, i: number) => ({
			label,
			value: chartData.data.labelsY[i],
		}))

		dispatch({ type: SET_TABLE_DATA, payload: tableData })
	}, [])

	const sortTableData = React.useCallback(({ key, orderBy }) => {
		dispatch({ type: UPDATE_SORT, payload: { key, orderBy } })
	}, [])

	return {
		state,
		setTableData,
		sortTableData,
	}
}
