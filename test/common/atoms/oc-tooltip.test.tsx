import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcTooltipComponent, TooltipProps } from '../../../src/ui/common';

const setUp = (props: TooltipProps) => shallow(<OcTooltipComponent {...props} />);

describe('Tooltip (common tooltip)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    const triggerComponent = React.createElement('div', null, 'trigger component');
    component = setUp({
      children: triggerComponent,
      tooltip: 'tooltip value',
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render under trigger element', () => {
    component.setProps({ position: 'bottom' });

    expect(component.prop('placement')).toEqual('bottom');
  });
});
