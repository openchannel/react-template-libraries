import { ChartOptions, Scale, TickOptions, TooltipOptions } from 'chart.js';

export const TABULAR_DATA_TYPE = 'tabular';
export const GRAPH_DATA_TYPE = 'graph';

export const defaultChartStatisticParameter = {
	label: '',
	active: true,
	id: Math.random().toString(36).substr(2, 9),
};

    /**
     * Calculates visible indexes for axis according to skip ratio and including first and
     * last ticks.
     * @param {number} tickCount number of ticks on the axis
     * @param {number} skipRatio interval according to which ticks should be skipped
     * @return {number[]} Array of ticks indexes that should be rendered
     */
export const calculateVisibleIndexes = (tickCount: number, skipRatio: number): number[] => {
	//@ts-ignore
	return Array.from(Array(tickCount).keys()).filter(i => {
		const isLast = i === tickCount - 1;
		const isFirst = i === 0;
		const shouldSkipOneBeforeLast = i % skipRatio === 0 && i + skipRatio >= tickCount;
		const shouldSkip = (skipRatio > 1 && i % skipRatio > 0) || shouldSkipOneBeforeLast;
		
		return !shouldSkip || isLast || isFirst;
	});
};

    /**
     * Determines whether to increase skip ratio based on visible ticks and skip ratio.
     * @param {number} skipRatio interval according to which ticks should be skipped
     * @param {number[]} visibleTicksIndexes Array of ticks indexes that should be rendered
     * @return {boolean} Whether to increase skip ratio
     */
export const shouldIncreaseSkipRatio = (skipRatio: number, visibleTicksIndexes: number[]): boolean => {
	const distanceBetweenLastTicks =
		visibleTicksIndexes[visibleTicksIndexes.length - 1] - visibleTicksIndexes[visibleTicksIndexes.length - 2];
	const incorrectLastTick = skipRatio === 1 && distanceBetweenLastTicks !== skipRatio;
	const increaseSkipRatio = distanceBetweenLastTicks - 1 !== skipRatio || incorrectLastTick;
	const evenlyDistributed =
		distanceBetweenLastTicks === skipRatio || visibleTicksIndexes.length === 2;

	return increaseSkipRatio && !evenlyDistributed;
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
					autoSkip: false,
					padding: 8,
					color: '#727272',
					maxRotation: 0,
					autoSkipPadding: 0,
					callback(rawValue) {
						//@ts-ignore
						const value = this.getLabelForValue(rawValue);
						return typeof value !== 'number' && value.length >= 8 ? value.substring(0, 3) : value;
						
					},
				} as Partial<TickOptions>,
				afterFit(axis: Scale): void {
					const tickCount = axis.ticks.length;
					if (tickCount === 0) {
						return;
					}

					const skipPadding = 20;
					const width = axis.width;
					const paddingLeft = axis.paddingLeft;
					const paddingRight = axis.paddingRight;

					// @ts-ignore
					let longestRotatedLabel = axis._labelSizes?.widest?.width;

					if (axis.labelRotation !== 0) {
						const labelRotationRadians = (axis.labelRotation * Math.PI) / 180;
						const cosRotation = Math.cos(labelRotationRadians);
						longestRotatedLabel *= cosRotation;
					}

					const maxPossibleWidth = (longestRotatedLabel + skipPadding) * tickCount;
					const actualWidth = width - (paddingLeft + paddingRight);

					let skipRatio = Math.floor(maxPossibleWidth / actualWidth) + 1;
					
					let visibleTicksIndexes =  calculateVisibleIndexes(tickCount, skipRatio);
					let increaseSkipRatio = shouldIncreaseSkipRatio(skipRatio, visibleTicksIndexes);

					// Increase skip ratio, so for odd ticks count we can render ticks
					// as evenly as possible. For example, all gaps between ticks have
					// skip ratio = 2 and last gap has skip ratio = 3 (the best solution for odd ticks count)
					while (increaseSkipRatio && skipRatio < tickCount - 2) {
						skipRatio++;
						visibleTicksIndexes = calculateVisibleIndexes(tickCount, skipRatio);
						increaseSkipRatio = shouldIncreaseSkipRatio(skipRatio, visibleTicksIndexes);
					}

					axis.ticks = axis.ticks.filter((_, i) => visibleTicksIndexes.includes(i));
				},
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
