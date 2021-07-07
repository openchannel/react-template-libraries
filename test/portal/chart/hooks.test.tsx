import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, ShallowWrapper, mount } from 'enzyme';

import { useChartReducer } from '../../../src/react-common-components/ui/portal/organisms/oc-chart/hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defaultChartProps } from './constants';

function HookWrapper(props: any) {
  const hook = props.hook ? props.hook() : undefined;
  return <div data-hook={hook} />;
}

describe('Chart (hooks)', () => {
  let setup: any = null;

  beforeEach(() => {
    const Component = ({ children }: any) => children(useChartReducer());

    setup = () => {
      const returnVal = {
        state: {
          tableData: [],
        },
        setTableData() {
          return;
        },
        sortTableData() {
          return;
        },
      };

      mount(
        <Component>
          {(val: any) => {
            Object.assign(returnVal, val);
            return null;
          }}
        </Component>,
      );

      return returnVal;
    };
  });

  it('should render', () => {
    const wrapper: ShallowWrapper = shallow(<HookWrapper hook={useChartReducer} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call setTableData and state must be not empty', () => {
    const hook = setup();

    act(() => {
      hook.setTableData(defaultChartProps.chartData);
    });

    expect(hook.state.tableData).not.toHaveLength(0);
  });

  it('should call sortTableData and the first element must be largest', () => {
    const hook = setup();

    act(() => {
      hook.setTableData(defaultChartProps.chartData);
      hook.sortTableData({ key: 'label', orderBy: 'desc' });
    });

    expect(hook.state.tableData[0].value).toBe(100);
  });
});
