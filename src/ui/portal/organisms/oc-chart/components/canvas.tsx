import * as React from 'react';
import { Chart } from 'chart.js';
import assign from 'lodash/assign';
import merge from 'lodash/merge';

import { CanvasProps, ChartStatisticDataModel } from '../types';
import { defaultChartParams } from '../utils';

export const Canvas: React.FC<CanvasProps & { data: ChartStatisticDataModel }> = (props) => {
	const { data, isBackgroundPainted, enablePoints } = props;

	const chartRef = React.useRef<HTMLCanvasElement | null>(null);
	const [chart, setChart] = React.useState<Chart>();

	React.useEffect(() => {
		renderChart();

		return () => {
			destroyChart();
		};
	}, []);

	React.useEffect(() => {
		updateChart();
	}, [data]);

	const getChartGradient = React.useCallback(() => {
		if (!chartRef.current) return;

		const context = chartRef.current.getContext('2d');

		if (!context) {
			return;
		}

		const gradientFill = context.createLinearGradient(0, 0, 0, 170);
		gradientFill.addColorStop(0, '#e7eef7');
		gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

		return gradientFill;
	}, [chartRef.current]);

	const renderChart = () => {
		if (!chartRef.current) return;

		const computedOptions = merge({}, defaultChartParams.options, {
			elements: {
				point: {
					radius: enablePoints ? 2 : 0,
					hoverRadius: enablePoints ? 4 : 0,
				},
			},
		});

		const computedData = merge({}, defaultChartParams.data, {
			labels: data.labelsX,
			datasets: [
				{
					data: data.labelsY,
					backgroundColor: isBackgroundPainted ? getChartGradient() : 'transparent',
				},
			],
		});

		setChart(
			new Chart(chartRef.current, {
				type: defaultChartParams.type,
				data: computedData,
				options: computedOptions,
			}),
		);
	};

	const updateChart = () => {
		if (!chart) return;

		assign(chart.config.data, {
			labels: data.labelsX ? data.labelsX : [],
			datasets: [
				{
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					...chart.config.data.datasets[0],
					data: data.labelsY ? data.labelsY : [],
				},
			],
		});

		chart.update();
	};

	const destroyChart = () => {
		if (chart) {
			chart.destroy();
		}
	};

	return (
		<div className="chart__data-container-canvas">
			<canvas ref={chartRef} height="220" />
		</div>
	);
};
