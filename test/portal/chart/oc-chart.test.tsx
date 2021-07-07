import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcChartComponent, ChartProps } from '../../../src/react-common-components/ui/portal';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { defaultChartProps } from './constants';

const setUp = (props: ChartProps) => shallow(<OcChartComponent {...props} />);

describe('Chart', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp(defaultChartProps);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass and accept additional props', () => {
    component.setProps({
      minDropdownWidth: 130,
      isBackgroundPainted: false,
      enablePoints: true,
      sortIcon: 'some-image-path',
    });

    expect(component.find('.chart').length).toEqual(1);
  });
});
