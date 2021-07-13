import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcAppCategoriesComponent, AppCategoriesProps } from '../../../packages/react-common-components/src/ui/common';

export default {
	title: 'App categories [BEM]',
	component: OcAppCategoriesComponent,
} as Meta;

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
//@ts-ignore
const duplicateItems = (arr, numberOfRepetitions) => Array(numberOfRepetitions).fill(arr).flat();

const AppCategories: Story<AppCategoriesProps> = (args) => {
	return (
		<OcAppCategoriesComponent
			customOptions={args.customOptions}
			autoPlaySpeed={args.autoPlaySpeed}
			swipeable={args.swipeable}
			draggable={args.draggable}
			showDots={args.showDots}
			centerMode={args.autoWidth}
			categoryHeaderTitle={args.categoryHeaderTitle}
			data={args.data}
		/>
	);
};

export const EmptyCategories = AppCategories.bind({});
EmptyCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	data: [],
};
EmptyCategories.storyName = 'Empty';

export const SomeCategories = AppCategories.bind({});
SomeCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	data: [data[0], data[0], data[0], data[0]],
};
SomeCategories.storyName = 'Some';

export const AllCategories = AppCategories.bind({});
AllCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	customOptions: {
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
	},
	navSpeed: 700,
	touchDrag: false,
	mouseDrag: false,
	dots: false,
	data: duplicateItems(data, 5),
};
AllCategories.storyName = 'All';
