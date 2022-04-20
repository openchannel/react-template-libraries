import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { RatingProps } from '../../../../src/ui/market';
import OcRatingComponent from '../../../../src/ui/market/atoms/oc-rating';
import { Star } from '../../../../src/ui/market/atoms/oc-rating/star';

const setUp = (props: RatingProps) => shallow(<OcRatingComponent {...props} />);

describe('Rating (market Rating)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			rating: 3.7,
			reviewCount: 14,
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render single-star with label', () => {
		component.setProps({
			label: 'reviews',
		});

		const labelText = component.find('.oc-rating-single__label').text();

		expect(labelText).toEqual('3.7 (14 reviews)');
	});

	it('should render single-star with custom labelClass', () => {
		component.setProps({
			labelClass: 'font-bold',
		});

		const isLabelHasClass = component.find('.oc-rating-single__label').hasClass('font-bold');

		expect(isLabelHasClass).toBe(true);
	});

	it('should render multi-star', () => {
		component.setProps({
			type: 'multi-star',
		});

		expect(component.find(Star)).toHaveLength(5);
	});
});
