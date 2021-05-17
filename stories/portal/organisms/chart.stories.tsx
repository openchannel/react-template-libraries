import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChartOptionsChange } from '../../../src/ui/portal';

import { Chart, ChartProps, ChartLayoutTypeModel } from '../../../src/ui/portal';


const month = {
	labelsY: [3, 10, 30, 50, 25, 40, 100, 70, 150, 200, 50, 85, 50],
	labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
	tabularLabels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
};

const day = {
	labelsY: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750],
	labelsX: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 05', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11'],
	tabularLabels: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 05', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11']
};

const defaultProps = {
	chartData: {
		layout: ChartLayoutTypeModel.standard,
		data: month,
		periods: [
			{
				id: 'month',
				label: 'Monthly',
				active: true,
				tabularLabel: 'Month'
			}, {
				id: 'day',
				label: 'Daily',
				tabularLabel: 'Day'
			}],
		fields: [
			{
				id: 'downloads',
				label: 'Downloads',
				active: true,
			}, {
				id: 'reviews',
				label: 'Reviews',
			}, {
				id: 'leads',
				label: 'Leads',
			}, {
				id: 'views',
				label: 'Views'
			}]
	},
	count: month.labelsY.reduce((a, b) => a + b, 0),
	countText: 'Total',
	downloadUrl: './img/upload_icon.svg',
	enablePoints: true,
	minDropdownWidth: '247px',
	activeDataType: 'graph',
}


export default {
	title: 'Chart',
	component: Chart,
} as Meta;

const Component: Story<ChartProps> = (args) => {
	const [chartData, setChartData] = React.useState(defaultProps.chartData);
	const [count, setCount] = React.useState(args.count);
	const [countText, setCountText] = React.useState(args.countText);

	const changeChartOptions = ({ period, field }: ChartOptionsChange) => {
		const newChartDat = { ...chartData };

		if (period.id === 'day') {
			newChartDat.data = day;
		} else {
			newChartDat.data = month;
		}

		newChartDat.fields = chartData.fields.map((item) => ({ ...item, active: field.id === item.id }));
		newChartDat.periods = chartData.periods.map((item) => ({ ...item, active: period.id === item.id }));

		setChartData(newChartDat);
		setCount(newChartDat.data.labelsY.reduce((a, b) => a + b, 0));
		setCountText(`Total ${field.id}`);
	}

	return (
		<Chart
			{...args}
			chartData={chartData}
			count={count}
			countText={countText}
			changeChartOptions={changeChartOptions}
		/>
	)
}

export const Default = Component.bind({});
Default.args = defaultProps;
