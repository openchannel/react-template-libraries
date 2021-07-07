import { ChartProps, ChartLayoutTypeModel } from '../../../src/react-common-components/ui/portal/organisms/oc-chart';


export const monthData = {
	labelsY: [3, 10, 30, 50, 25, 40, 100, 70, 150, 200, 50, 85, 50],
	labelsX: ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
	tabularLabels: ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March']
};

export const dayData = {
	labelsY: [200, 400, 100, 50, 700, 750, 250, 200, 400, 100, 50, 700, 750],
	labelsX: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 04', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11'],
	tabularLabels: ['Jan 30', 'Jan 31', 'Feb 01', 'Feb 02', 'Feb 03', 'Feb 04', 'Feb 04', 'Feb 06',
		'Feb 07', 'Feb 08', 'Feb 09', 'Feb 10', 'Feb 11']
};

export const defaultChartProps = {
	chartData: {
		layout: ChartLayoutTypeModel.standard,
		data: monthData,
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
	count: monthData.labelsY.reduce((a, b) => a + b, 0),
	countText: 'Total',
	downloadUrl: '',
} as ChartProps
