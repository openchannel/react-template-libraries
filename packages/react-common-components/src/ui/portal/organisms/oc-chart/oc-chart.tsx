//commit 00427f4c0046b997f1a54ab2024d343caed1f46a Author: Julia Date: 24.03.21, 15:13
import * as React from 'react';

import { Actions } from './components/actions';
import { Canvas } from './components/canvas';
import { Table } from './components/table';
import { TotalInfo } from './components/total-info';
import { ChartProps, DataType } from './types';
import { GRAPH_DATA_TYPE, TABULAR_DATA_TYPE } from './utils';

import './style.scss';

export const OcChartComponent: React.FC<ChartProps> = (props) => {
	const {
		count,
		countText,
		downloadUrl,
		chartData,
		changeChartOptions,
		minDropdownWidth = 'auto',
		isBackgroundPainted = true,
		enablePoints = false,
		activeDataType: initialActiveDataType = GRAPH_DATA_TYPE,
		sortIcon = '',
	} = props;

	const [activeDataType, setActiveDataType] = React.useState<DataType>(initialActiveDataType);

	return (
		<div className="chart">
			<Actions
				activeDataType={activeDataType}
				onChangeDataType={setActiveDataType}
				periods={chartData.periods}
				fields={chartData.fields}
				changeChartOptions={changeChartOptions}
				minDropdownWidth={minDropdownWidth}
			/>
			<div className="chart__data-container">
				{activeDataType === GRAPH_DATA_TYPE && (
					<Canvas
						data={chartData.data}
						isBackgroundPainted={isBackgroundPainted}
						enablePoints={enablePoints}
					/>
				)}
				{activeDataType === TABULAR_DATA_TYPE && (
					<Table chartData={chartData} sortIcon={sortIcon} />
				)}
				{count >= 0 && <TotalInfo count={count} countText={countText} downloadUrl={downloadUrl} />}
			</div>
		</div>
	);
};