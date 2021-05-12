import * as React from 'react';

import { UPDATE_SORT, SET_TABLE_DATA } from './chart-state';
import { TABULAR_DATA_TYPE, GRAPH_DATA_TYPE } from './utils';
import { MinDropdownWidth } from '../../../common/molecules/oc-dropdown';


export type DataType = typeof TABULAR_DATA_TYPE | typeof GRAPH_DATA_TYPE;

export type ChangeChartOptions = ({ field, period }: ChartOptionsChange) => void;

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
	chartData: ChartStatisticModel;
	changeChartOptions: ChangeChartOptions;
	/**
	 * @default auto
	 */
	minDropdownWidth?: MinDropdownWidth;
	sortIcon?: string;
}

export interface CanvasProps {
	/**
	 * Set or remove background color for chart line
	 * @default true
	 */
	isBackgroundPainted?: boolean;
	/**
	 * Enable or Disable points on Chart
	 * @default false
	 */
	enablePoints?: boolean;
}

export interface TotalInfoProps {
	count: number;
	countText: string;
	downloadUrl: string;
}

export type ChartProps = BaseChartProps & TotalInfoProps & CanvasProps;

export interface ChartReducer {
	tableData: { label: string, value: number }[];
	sort: {
		key: string;
		orderBy: string;
	},
}

export interface ChartAction {
	type: typeof SET_TABLE_DATA | typeof UPDATE_SORT;
	payload: any;
}

export interface ActionsProps {
	chartData: ChartStatisticModel;
	activeDataType: DataType;
	onChangeDataType: React.Dispatch<DataType>;
	changeChartOptions: ChangeChartOptions;
	minDropdownWidth?: MinDropdownWidth;
}

export interface TableProps {
	chartData: ChartStatisticModel;
	sortIcon?: string;
}

export interface RadioProps {
	id: string;
	label: string;
	checked: boolean;
	onChange: (e: React.SyntheticEvent) => void;
}
