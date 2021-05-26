import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { TableProps } from '../../../src/ui/portal';
import { Table } from '../../../src/ui/portal/organisms/oc-chart/components/table';
// import { useChartReducer } from '../../../src/ui/portal/organisms/chart/hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defaultChartProps } from './constants';

const setUp = (props: TableProps) => shallow(<Table {...props} />);

describe('Chart (table)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    // const Component = ({ children }: any) => children(useChartReducer());
    //
    // setup = () => {
    // 	const returnVal = {
    // 		state: {
    // 			tableData: [],
    // 		},
    // 		setTableData: jest.fn(),
    // 		sortTableData: jest.fn(),
    // 	};
    //
    // 	mount(
    // 		<Component>
    // 			{(val: any) => {
    // 				Object.assign(returnVal, val);
    // 				return null;
    // 			}}
    // 		</Component>
    // 	);
    //
    // 	return returnVal;
    // }

    component = setUp({
      chartData: defaultChartProps.chartData,
      sortIcon: './some-icon-path',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
