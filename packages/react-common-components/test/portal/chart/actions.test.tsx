import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ActionsProps } from '@openchannel/react-common-components';
import OcDropdownButton from '../../../src/ui/common/molecules/oc-dropdown/oc-dropdown-button';
import { Actions } from '../../../src/ui/portal/organisms/oc-chart/components/actions';
import { Radio } from '../../../src/ui/portal/organisms/oc-chart/components/radio';
import {
	GRAPH_DATA_TYPE,
	TABULAR_DATA_TYPE,
} from '../../../src/ui/portal/organisms/oc-chart/utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defaultChartProps } from './constants';

const setUp = (props: ActionsProps) => shallow(<Actions {...props} />);

describe('Chart (actions)', () => {
	let component: ShallowWrapper;

	const onChangeDataType = jest.fn();
	const changeChartOptionsMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			periods: defaultChartProps.chartData.periods,
			fields: defaultChartProps.chartData.fields,
			activeDataType: TABULAR_DATA_TYPE,
			onChangeDataType: onChangeDataType,
			changeChartOptions: changeChartOptionsMock,
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should click first radio and fire changeChartOptions with passed params', () => {
		const radioInput = component.find(Radio).get(0);

		radioInput.props.onChange({ target: { id: radioInput.props.id } });

		expect(changeChartOptionsMock).toHaveBeenCalledWith({
			field: { active: true, id: 'downloads', label: 'Downloads' },
			period: { active: true, id: 'month', label: 'Monthly', tabularLabel: 'Month' },
		});
	});

	it('should click on "graph" type view button and fire with value', () => {
		const button = component.find('.chart__graph-button');

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		button.props().onClick({ currentTarget: { dataset: { name: button.props()['data-name'] } } });

		expect(onChangeDataType).toHaveBeenCalledWith(GRAPH_DATA_TYPE);
	});

	it('should select a new "field" and fire changeChartOptions with passed param', () => {
		const dropdown = component.find(OcDropdownButton);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockedEvent: any = {};

		dropdown.props().onSelect({ id: 'reviews', label: 'Reviews' }, mockedEvent);

		expect(changeChartOptionsMock).toHaveBeenCalledWith({
			field: { id: 'reviews', label: 'Reviews' },
			period: { active: true, id: 'month', label: 'Monthly', tabularLabel: 'Month' },
		});
	});
});
