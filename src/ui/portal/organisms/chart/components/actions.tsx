// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { MinDropdownWidth } from '../../../../common/molecules';

import { Radio } from './radio';
import { Dropdown } from '../../../../common/molecules';
import TabularIcon from '../../../../../assets/img/icon-tabular.svg';
import GraphIcon from '../../../../../assets/img/icon-graph.svg';
import SelectDownIcon from '../../../../../assets/img/select-down.svg';
import SelectUpIcon from '../../../../../assets/img/select-up.svg';
import { TABULAR_DATA_TYPE, GRAPH_DATA_TYPE, ChartStatisticModel, DataType } from '../index';


export interface ActionsProps {
	chartData: ChartStatisticModel;
	activeDataType: DataType;
	onChangeDataType: React.Dispatch<string>;
	changeChartOptions: () => void;
	minDropdownWidth?: MinDropdownWidth;
}

export const Actions: React.FC<ActionsProps> = (props) => {
	const {
		chartData: {
			periods,
			fields,
		},
		activeDataType,
		onChangeDataType,
		changeChartOptions,
		minDropdownWidth,
	} = props;

	const [selectedPeriod, setActivePeriod] = React.useState(periods.find(({ active }) => active) || {});
	const [selectedChartType, setChartType] = React.useState(fields.find(({ active }) => active) || {});

	const onChangePeriod = React.useCallback((e) => {
		const period = periods.find(({ id }) => id === e.target.id);

		setActivePeriod(period)
		changeChartOptions({ period, field: selectedChartType });
	}, [selectedChartType, periods])

	const onSelectChartType = React.useCallback((value) => {
		setChartType(value);
		changeChartOptions({ field: value, period: selectedPeriod });
	}, [selectedPeriod, fields])

	const onClickDataType = React.useCallback((e) => {
		onChangeDataType(e.currentTarget.dataset.name);
	}, [])

	return (
		<div className="chart__options-container">
			<div className="chart__period-container">
				{
					periods.map((obj) => (
						<Radio
							key={obj.id}
							id={obj.id}
							label={obj.label}
							checked={selectedPeriod.id === obj.id}
							onChange={onChangePeriod}
						/>
					))
				}
			</div>
			<div className="chart__filter-buttons-container">
				<div className="chart__filter-buttons-container-tabs">
					<div
						data-name={TABULAR_DATA_TYPE}
						onClick={onClickDataType}
						className={`chart__swap-type-button chart__graph-button ${activeDataType === TABULAR_DATA_TYPE ? 'chart__swap-type-button_active' : ''}`}
					>
						<TabularIcon />
					</div>
					<div
						data-name={GRAPH_DATA_TYPE}
						onClick={onClickDataType}
						className={`chart__swap-type-button chart__tabular-button ${activeDataType === GRAPH_DATA_TYPE ? 'chart__swap-type-button_active' : ''}`}
					>
						<GraphIcon />
					</div>
				</div>
				<Dropdown
					variant="block"
					options={fields}
					onSelect={onSelectChartType}
					selected={selectedChartType}
					className="chart__type-section"
					minDropdownWidth={minDropdownWidth}
					defaultPlaceholderIcon={<SelectDownIcon className="chart__type-section-dropdown-icon" />}
					activePlaceholderIcon={<SelectUpIcon className="chart__type-section-dropdown-icon" />}
				>
					<div className="chart__type-section-dropdown">
						{/* eslint-disable-next-line jsx-a11y/label-has-for */}
						<label className="chart__type-section-dropdown-label">
							{selectedChartType.label}
						</label>
					</div>
				</Dropdown>
			</div>
		</div>
	)
}
