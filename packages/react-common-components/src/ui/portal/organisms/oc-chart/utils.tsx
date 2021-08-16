import { ChartOptions, TickOptions, TooltipOptions } from 'chart.js';

export const TABULAR_DATA_TYPE = 'tabular';
export const GRAPH_DATA_TYPE = 'graph';

export const defaultChartStatisticParameter = {
	label: '',
	active: true,
	id: Math.random().toString(36).substr(2, 9),
};

export const defaultChartParams = {
	type: 'line',
	data: {
		// labels: chartData?.data?.labelsX ? chartData.data.labelsX : [],
		labels: [],
		datasets: [
			{
				// data: chartData?.data?.labelsY ? chartData.data.labelsY : [],
				data: [],
				// backgroundColor: isBackgroundColor ? gradientFill : 'transparent',
				backgroundColor: 'transparent',
				borderColor: 'rgba(83, 124, 253, 1)',
				tension: 0,
				borderWidth: 1.7,
			},
		],
	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
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
			},
		},
		scales: {
			x: {
				position: 'bottom',
				grid: {
					display: false,
				},
				ticks: {
					autoSkip: true,
					padding: 8,
					color: '#727272',
					maxRotation: 0,
					autoSkipPadding: 20,
					callback: (value) =>
						typeof value !== 'number' && value.length >= 8 ? value.substring(0, 3) : value,
				} as Partial<TickOptions>,
			},
			y: {
				grid: {
					drawBorder: false,
					color: 'rgba(201, 213, 234, 0.4)',
					lineWidth: 1,
				},
				min: 0,
				beginAtZero: true,
				ticks: {
					autoSkip: true,
					color: '#727272',
					callback: (value) => (value > 999 ? `${+value / 1000}k` : value),
				} as Partial<TickOptions>,
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				enabled: true,
				intersect: false,
				position: 'nearest',
				backgroundColor: '#FFF',
				titleFont: {
					size: 14,
				},
				titleColor: '#333333',
				bodyColor: '#727272',
				borderColor: '#c9d5ea',
				borderWidth: 1,
				titleMarginBottom: 6,
				bodyFont: {
					size: 12,
				},
				padding: 12,
				caretPadding: 20,
				displayColors: false,
				titleAlign: 'center',
				bodyAlign: 'center',
				callbacks: {
					title: (tooltipItem) => `  ${tooltipItem[0].formattedValue}  `,
					label: (tooltipItem) => tooltipItem.label,
				},
			} as TooltipOptions<'line'>,
		},
	} as ChartOptions,
};
