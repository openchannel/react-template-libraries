import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Star, StarProps } from '../../../../src/ui/market/atoms/oc-rating/star';

const setUp = (props: StarProps) => shallow(<Star {...props} />);

describe('Star of Rating component (market Rating)', () => {
  let component: ShallowWrapper;

  beforeEach(() => {
    component = setUp({
      star: 1,
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
    component.setProps({ star: 2, rating: 0.8 });

    expect(component.find('span').filter('span')).toHaveLength(1);
  });

	it('should render empty star', () => {
		component.setProps({ star: 2, rating: 0.8 });

		expect(component.find('span').filter('span')).toHaveLength(1);
	});

	it('should render enabled star', () => {
		expect(component.find('.oc-rating-multi__star_disabled').exists()).not.toBeTruthy();
	});

	it('should render disabled star', () => {
		component.setProps({ disabled: true });

		expect(component.find('.oc-rating-multi__star_disabled').exists()).toBeTruthy();
	});
});
