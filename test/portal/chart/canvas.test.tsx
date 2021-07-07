import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ChartStatisticDataModel } from '../../../src/react-common-components/ui/portal';

import { CanvasProps } from '../../../src/react-common-components/ui/portal';
import { Canvas } from '../../../src/react-common-components/ui/portal/organisms/oc-chart/components/canvas';
// import { useChartReducer } from '../../../src/ui/portal/organisms/chart/hooks';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defaultChartProps } from './constants';

const setUp = (props: CanvasProps & { data: ChartStatisticDataModel }) =>
  shallow(<Canvas {...props} />);

describe('Chart (canvas)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp({
      data: defaultChartProps.chartData.data,
      isBackgroundPainted: true,
      enablePoints: true,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
