import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Star, StarProps } from '../../../../src/ui/market/atoms/oc-rating/star';

const setUp = (props: StarProps) => shallow(<Star {...props} />);

describe('Star of Rating component (market Rating)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp({
      index: 0,
      rating: 3.4,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render filled star', () => {
    expect(component.find('.oc-rating-multi__star_filled').exists()).toBeTruthy();
  });

  it('should render half-filled star', () => {
    component.setProps({ rating: 0.3 });

    expect(component.find('.oc-rating-multi__star_half-color').exists()).toBeTruthy();
  });

  it('should render empty star', () => {
    component.setProps({ index: 1, rating: 0.8 });

    expect(component.find('span').filter('span')).toHaveLength(1);
  });
});
