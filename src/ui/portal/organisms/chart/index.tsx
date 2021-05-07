//commit 00427f4c0046b997f1a54ab2024d343caed1f46a Author: Julia Date: 24.03.21, 15:13

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import ChartJS from 'chart.js';

import { Table } from './components/table';
import { Actions } from './components/actions';
import { TotalInfo, TotalInfoProps } from './components/totalInfo';
import { MinDropdownWidth } from '../../../common/molecules/dropdown';
import './styles.scss';


export const TABULAR_DATA_TYPE = 'tabular';
export const GRAPH_DATA_TYPE = 'graph';

export type DataType = typeof TABULAR_DATA_TYPE | typeof GRAPH_DATA_TYPE;

export enum ChartLayoutTypeModel {
	standard = 'standard',
}

export interface ChartStatisticModel {
	layout: ChartLayoutTypeModel.standard;
	data: ChartStatisticDataModel;
	fields: ChartStatisticFiledModel[];
	periods: ChartStatisticPeriodModel[];
}

export interface ChartStatisticDataModel {
	labelsY: number[];
	labelsX: string[] | number[];
	tabularLabels?: string[];
}

export interface ChartStatisticFiledModel extends ChartStatisticParameterModel {
	icon?: string;
}

export interface ChartStatisticPeriodModel extends ChartStatisticParameterModel {
	tabularLabel?: string;
}

export interface ChartOptionsChange {
	field: ChartStatisticFiledModel;
	period: ChartStatisticPeriodModel;
}

export interface ChartStatisticParameterModel {
	id: string;
	label: string;
	active?: boolean;
}

export interface BaseChartProps {
	count: number;
	countText: string;
	downloadUrl: string;
	chartData: ChartStatisticModel;

	changeChartOptions: () => void;
	/**
	 * @default auto
	 */
	minDropdownWidth?: MinDropdownWidth;

	sortIcon?: string;
}

export type ChartProps = BaseChartProps & TotalInfoProps

export const Chart: React.FC<ChartProps> = (props) => {
	const {
		count,
		countText,
		downloadUrl,

		chartData,
		minDropdownWidth = 'auto',

		changeChartOptions,

		sortIcon,
	} = props;

	const chartRef = React.useRef(null);
	const [activeDataType, setActiveDataType] = React.useState(TABULAR_DATA_TYPE);

	console.log('rerender')

	return (
		<div className="chart">
			<Actions
				activeDataType={activeDataType}
				onChangeDataType={setActiveDataType}
				chartData={chartData}
				changeChartOptions={changeChartOptions}
				minDropdownWidth={minDropdownWidth}
			/>
			<div className="chart__data-container">
				{activeDataType === GRAPH_DATA_TYPE && (
					<div className="chart__data-container-canvas">
						<canvas ref={chartRef} height="220" />
					</div>
				)}
				{activeDataType === TABULAR_DATA_TYPE && (
					<Table
						chartData={chartData}
						sortIcon={sortIcon}
					/>
				)}
				{count >= 0 && (
					<TotalInfo
						count={count}
						caption={countText}
						imageSrc={downloadUrl}
					/>
				)}
			</div>
		</div>
	)
}
