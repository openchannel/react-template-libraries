// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Chart, ChartProps, ChartLayoutTypeModel } from '../../../src/ui/portal';


const month = {
	labelsY: [3, 10, 30, 50, 25, 40, 100, 70, 150, 200, 50, 85, 50],
	labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
	tabularLabels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
};

const day = {
	labelsY: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750],
	labelsX: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 04', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11'],
	tabularLabels: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 04', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11']
};

export default {
	title: 'Portal/Organisms/Chart',
	component: Chart,
} as Meta;

const Component: Story<ChartProps> = (args) => <Chart {...args} />;

export const Monthly = Component.bind({});
Monthly.args = {
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
	// isBackgroundColor: true,
	enablePoints: true,
	minDropdownWidth: '247px',
	random: true
};
Monthly.storyName = 'Monthly chart';


// export const Daily = Component.bind({});
// Daily.args = {
// 	type: 'multi-star',
// 	rating: 3.4,
// 	reviewCount: 17,
// };
// Daily.storyName = 'Daily chart';
