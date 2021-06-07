//@ts-nocheck
import * as React from 'react';
import { mount, ShallowWrapper } from 'enzyme';
import { OcAppCategoriesComponent } from '../../../src/ui/common/organisms/oc-app-categories';

const data = [
	{
		categoryCardClass: 'category-card',
		categoryLogo: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-1.png',
		categoryName: 'All Apps',
		categoryTitleColor: 'orange',
	},
	{
		categoryCardClass: 'category-card',
		categoryLogo: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-2.png',
		categoryName: 'Analytics',
		categoryTitleColor: 'blue',
	},
	{
		categoryCardClass: 'category-card',
		categoryLogo: 'https://stage1-philips-market-test.openchannel.io/assets/img/item-3.png',
		categoryName: 'Communication',
		categoryTitleColor: 'green',
	},
];

describe('OcAppCategoriesComponent', () => {
	let component: ShallowWrapper = mount(
		<OcAppCategoriesComponent
			categoryHeaderTitle="Categories to Explore"
			customOptions={{
				desktop: {
					breakpoint: { max: 3000, min: 1024 },
					items: 8,
					slidesToSlide: 1,
				},
				tablet: {
					breakpoint: { max: 1024, min: 464 },
					items: 2,
				},
				mobile: {
					breakpoint: { max: 464, min: 0 },
					items: 1,
				},
			}}
			navSpeed={700}
			touchDrag={false}
			mouseDrag={false}
			dots={false}
			autoWidth={false}
			data={data}
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have props and change them', () => {
		expect(component.prop('data')).toEqual(data);
		expect(component.prop('touchDrag')).toEqual(false);
		expect(component.prop('mouseDrag')).toEqual(false);
		expect(component.prop('dots')).toEqual(false);
		expect(component.prop('autoWidth')).toEqual(false);
		expect(component.prop('categoryHeaderTitle')).toEqual('Categories to Explore');
		component.setProps({ touchDrag: false });
		component.setProps({ mouseDrag: false });
		component.setProps({ dots: false });
		component.setProps({ autoWidth: false });
		component.setProps({ categoryHeaderTitle: 'Default' });
		component.update();
		expect(component.prop('touchDrag')).toEqual(false);
		expect(component.prop('mouseDrag')).toEqual(false);
		expect(component.prop('dots')).toEqual(false);
		expect(component.prop('autoWidth')).toEqual(false);
		expect(component.prop('categoryHeaderTitle')).toEqual('Default');
	});
});
