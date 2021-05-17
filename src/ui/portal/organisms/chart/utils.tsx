import _merge from 'lodash/merge';
import { ChartTooltipOptions, ChartConfiguration, NestedTickOptions } from 'chart.js';


export const TABULAR_DATA_TYPE = 'tabular';
export const GRAPH_DATA_TYPE = 'graph';

export const defaultChartStatisticParameter = {
	label: '',
	active: true,
	id: Math.random().toString(36).substr(2, 9),
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mergeChartParams = (newParams: ChartConfiguration, params = defaultChartParams) => {
	return _merge(params, newParams);
}

export const defaultChartParams = {
	type: 'line',
	data: {
		// labels: chartData?.data?.labelsX ? chartData.data.labelsX : [],
		labels: [],
		datasets: [
			{
				label: '',
				// data: chartData?.data?.labelsY ? chartData.data.labelsY : [],
				data: [],
				// backgroundColor: isBackgroundColor ? gradientFill : 'transparent',
				backgroundColor: 'transparent',
				borderColor: 'rgba(83, 124, 253, 1)',
				lineTension: 0,
				borderWidth: 1.7
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		legend: {
			display: false
		},
		tooltips: {
			enabled: true,
			intersect: false,
			position: 'nearest',
			backgroundColor: '#FFF',
			titleFontSize: 14,
			titleFontColor: '#333333',
			bodyFontColor: '#727272',
			borderColor: '#c9d5ea',
			borderWidth: 1,
			titleMarginBottom: 6,
			bodyFontSize: 12,
			xPadding: 12,
			yPadding: 12,
			caretPadding: 20,
			displayColors: false,
			titleAlign: 'center',
			bodyAlign: 'center',
			callbacks: {
				title: (tooltipItem) => `  ${tooltipItem[0].value}  `,
				label: ({ label }) => label,
			}
		} as ChartTooltipOptions,
		elements: {
			point: {
				// radius: enablePoints ? 2 : 0,
				radius: 0,
				hitRadius: 10,
				// hoverRadius: enablePoints ? 4 : 0,
				hoverRadius: 0,
				hoverBorderWidth: 0,
				backgroundColor: 'rgba(83, 124, 253, 1)',
				borderColor: 'rgba(83, 124, 253, 1)',
			},
			line: {
				tension: 0, // 0 disables bezier curves
			}
		},
		scales: {
			xAxes: [
				{
					position: 'bottom',
					gridLines: {
						display: false,
					},
					ticks: {
						autoSkip: true,
						padding: 8,
						fontColor: '#727272',
						maxRotation: 0,
						autoSkipPadding: 20,
						callback: (value) => typeof value !== 'number' && value.length >= 8 ? value.substring(0, 3) : value
					} as NestedTickOptions,
				},
			],
			yAxes: [
				{
					gridLines: {
						drawBorder: false,
						color: 'rgba(201, 213, 234, 0.4)',
						zeroLineWidth: 0
					},
					ticks: {
						autoSkip: true,
						min: 0,
						beginAtZero: true,
						fontColor: '#727272',
						lineHeight: 3,
						callback: (value) => value > 999 ? `${Number(value) / 1000}k` : value,
					} as NestedTickOptions,
				},
			],
		},
		// problem and solution - https://github.com/chartjs/Chart.js/issues/622#issuecomment-341648856
		layout: {
			padding: {
				right: 40,
			},
		},
	},
}
