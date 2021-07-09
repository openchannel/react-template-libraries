//@ts-nocheck
import * as React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { CategoryItem } from '../../../packages/react-common-components/src/ui/common/organisms/oc-app-categories/category-item';

describe('Category Item', () => {
	let component: ShallowWrapper = mount(
		<CategoryItem
			categoryCardClass="category-card"
			categoryLogo="https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png"
			categoryName="All Apps"
			categoryTitleColor="orange"
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change props', () => {
		expect(component.prop('categoryLogo')).toEqual(
			'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png',
		);
		component.setProps({
			categoryLogo: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-2.png',
		});
		component.update();
		expect(component.prop('categoryLogo')).toEqual(
			'https://stage1-philips-market-test.openchannel.io/assets/img/item-2.png',
		);
		component.setProps({ categoryName: 'test' });
		component.update();
		expect(component.prop('categoryName')).toEqual('test');
	});
});
