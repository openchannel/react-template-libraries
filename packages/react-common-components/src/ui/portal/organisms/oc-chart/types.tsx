import * as React from 'react';

import { MinDropdownWidth } from '../../../common/molecules/oc-dropdown';

import { SET_TABLE_DATA, UPDATE_SORT } from './chart-state';
import { GRAPH_DATA_TYPE, TABULAR_DATA_TYPE } from './utils';

export type DataType = string | typeof TABULAR_DATA_TYPE | typeof GRAPH_DATA_TYPE;

export type ChangeChartOptions = ({ field, period, app }: ChartOptionsChange) => void;

export enum ChartLayoutTypeModel {
	standard = 'standard',
}

export interface ChartStatisticModel {
	layout: ChartLayoutTypeModel.standard;
	data: ChartStatisticDataModel;
	fields: ChartStatisticFiledModel[];
	periods: ChartStatisticPeriodModel[];
	apps?:ChartStatisticParameterModel[];
}

export interface ChartStatisticDataModel {
	labelsY: number[];
	labelsX: Array<string | number>;
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
	app?: ChartStatisticPeriodModel;
}

export interface ChartStatisticParameterModel {
	id: string;
	label: string;
	active?: boolean;
}

export interface BaseChartProps {
	/**
	 * Main model for building chart with buttons and dropdown
	 */
	chartData: ChartStatisticModel;
	changeChartOptions: ChangeChartOptions;
	/**
	 * Min width for the dropdown
	 * @default auto
	 */
	minDropdownWidth?: MinDropdownWidth;
	/**
	 * Set active data view type from the start. Default: graph;
	 * @default graph
	 */
	activeDataType?: string | typeof TABULAR_DATA_TYPE | typeof GRAPH_DATA_TYPE;
	/**
	 * Path to the custom icon for the 'sort' button
	 */
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
	/**
	 * Url of the Chart count image
	 */
	downloadUrl: string;
}

export type ChartProps = BaseChartProps & TotalInfoProps & CanvasProps;

export interface ChartReducer {
	tableData: { label: string; value: number }[];
	sort: {
		key: string;
		orderBy: string;
	};
}

export interface ChartAction {
	type: typeof SET_TABLE_DATA | typeof UPDATE_SORT | string;
	payload: any;
}

export interface ActionsProps {
	fields: ChartStatisticFiledModel[];
	periods: ChartStatisticPeriodModel[];
	apps?:ChartStatisticParameterModel[];
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
