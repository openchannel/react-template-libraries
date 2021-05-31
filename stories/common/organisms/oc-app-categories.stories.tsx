import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcAppCategoriesComponent, AppCategoriesProps } from '../../../src/ui/common';

export default {
	title: 'App categories [BEM]',
	component: OcAppCategoriesComponent,
} as Meta;

const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

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

const duplicateItems = (arr, numberOfRepetitions) =>
	arr.flatMap((i) => Array.from({ length: numberOfRepetitions }).fill(i));

const AppCategories: Story<AppCategoriesProps> = (args) => {
	return (
		<OcAppCategoriesComponent
			customOptions={responsive}
			autoPlaySpeed={700}
			swipeable={false}
			draggable={false}
			showDots={false}
			centerMode={true}
			categoryHeaderTitle="Categories to Explore"
			data={args.data}
		/>
	);
};

export const EmptyCategories = AppCategories.bind({});
EmptyCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	customOptions: responsive,
	autoPlaySpeed: 700,
	swipeable: false,
	draggable: false,
	showDots: false,
	centerMode: true,
	data: [],
};
EmptyCategories.storyName = 'Empty';

export const SomeCategories = AppCategories.bind({});
SomeCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	customOptions: responsive,
	autoPlaySpeed: 700,
	swipeable: false,
	draggable: false,
	showDots: false,
	centerMode: true,
	data: data,
};
SomeCategories.storyName = 'Some';

export const AllCategories = AppCategories.bind({});
AllCategories.args = {
	categoryHeaderTitle: 'Categories to Explore',
	customOptions: responsive,
	autoPlaySpeed: 700,
	swipeable: false,
	draggable: false,
	showDots: false,
	centerMode: true,
	data: duplicateItems(data, 5),
};
AllCategories.storyName = 'All';
