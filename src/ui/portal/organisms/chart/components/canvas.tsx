import * as React from 'react';
import merge from 'lodash/merge';
import { Chart } from 'chart.js';

import { mergeChartParams } from '../utils';
import { CanvasProps, ChartStatisticModel } from '../types';


export const Canvas: React.FC<CanvasProps & { chartData: ChartStatisticModel }> = (props) => {
	const {
		chartData: {
			data,
		},
		isBackgroundPainted,
		enablePoints,
	} = props;

	const chartRef = React.useRef<HTMLCanvasElement | null>(null);
	const [chart, setChart] = React.useState<Chart>();

	React.useEffect(() => {
		renderChart();

		return () => {
			destroyChart();
		}
	}, [])

	React.useEffect(() => {
		updateChart();
	}, [data])

	const renderChart = () => {
		if (!chartRef.current) return;

		const context = chartRef.current.getContext('2d');

		if (!context) {
			return
		}

		const gradientFill = context.createLinearGradient(0, 0, 0, 170);
		gradientFill.addColorStop(0, '#e7eef7');
		gradientFill.addColorStop(1, 'rgba(240, 247, 255, 0.25)');

		setChart(
			new Chart(
				chartRef.current,
				mergeChartParams({
					data: {
						labels: data.labelsX ? data.labelsX : [],
						datasets: [
							{
								data: data.labelsY ? data.labelsY : [],
								backgroundColor: isBackgroundPainted ? gradientFill : 'transparent',
							},
						],
					},
					options: {
						elements: {
							point: {
								radius: enablePoints ? 2 : 0,
								hoverRadius: enablePoints ? 4 : 0,
							},
						},
					},
				}),
			)
		);
	};

	const updateChart = () => {
		if (!chart) return;

		merge(
			chart.data,
			{
				labels: data.labelsX ? data.labelsX : [],
				datasets: [
					{
						data: data.labelsY ? data.labelsY : [],
					},
				],
			},
		);

		chart.update();
	}

	const destroyChart = () => {
		if (chart) {
			chart.destroy();
		}
	};

	return (
		<div className="chart__data-container-canvas">
			<canvas ref={chartRef} height="220" />
		</div>
	)
}
