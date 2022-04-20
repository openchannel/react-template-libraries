import * as React from 'react';
import {mount, shallow, ReactWrapper, ShallowWrapper} from 'enzyme';
import OcReviewComponent from '../../../../src/ui/common/molecules/oc-review/oc-review';

describe('OcReviewComponent', () => {
	it('should create', () => {
		let component: ShallowWrapper = shallow(<OcReviewComponent/>);
		expect(component).toBeTruthy();
	});

	it('should have and update props', () => {
		let component: ReactWrapper = mount(
			<OcReviewComponent
				heading={'Write a review'}
			enableButtons
				// @ts-ignore
				reviewData={{headline: 'a'}}
		/>
		);
		expect(component.prop('heading')).toEqual('Write a review');
		expect(component.prop('enableButtons')).toBeTruthy();
		expect(component.prop('reviewData')).toEqual({headline: 'a'});
		component.setProps({
			heading: 'h',
			enableButtons: false,
			reviewData: {headline: 'b'},
		})
		expect(component.prop('heading')).toEqual('h');
		expect(component.prop('enableButtons')).toBeFalsy();
		expect(component.prop('reviewData')).toEqual({headline: 'b'});
	})
});
