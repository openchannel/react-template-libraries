import * as React from 'react';
import { mount } from 'enzyme';
import {
	CustomLeftArrow,
	CustomRightArrow,
} from '../../../src/react-common-components/ui/common/organisms/oc-app-categories/custom-arrows';

describe('CategoryItem', () => {
	let leftArrow = mount(<CustomLeftArrow onClick={undefined} />);
	let rightArrow = mount(<CustomRightArrow onClick={undefined} />);

	it('should create', () => {
		expect(leftArrow).toBeTruthy();
		expect(rightArrow).toBeTruthy();
	});

	it('should have onClick prop', () => {
		expect(leftArrow.prop('onClick')).toEqual(undefined);
		leftArrow.setProps({ onClick: () => {} });
		leftArrow.update();
		expect(leftArrow.prop('onClick')).toBeTruthy();
		rightArrow.setProps({ onClick: () => {} });
		rightArrow.update();
		expect(rightArrow.prop('onClick')).toBeTruthy();
	});
});
