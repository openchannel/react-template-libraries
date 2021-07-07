import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcReviewListComponent, ReviewListProps } from '../../../src/react-common-components/ui/common';

export default {
	title: 'Review List [BEM]',
	component: OcReviewListComponent,
} as Meta;

const ReviewListComponent: Story<ReviewListProps> = (args) => {
	return <OcReviewListComponent {...args} />;
};

export const Empty = ReviewListComponent.bind({});
Empty.args = {
	reviewListTitle: 'Most recent reviews',
	reviewList: [],
	maxReviewDisplay: 0,
	noReviewMessage: 'No Review for this app',
};

export const SomeReviews = ReviewListComponent.bind({});
SomeReviews.args = {
	reviewListTitle: 'Most recent reviews',
	reviewList: [
		{
			reviewOwnerName: 'Jon from Sales CRM',
			rating: 0,
			review: 'We love this app. very useful and easy to use!',
		},
	],
	noReviewMessage: 'No Review for this app',
};

export const All = ReviewListComponent.bind({});
All.args = {
	reviewListTitle: 'Most recent reviews',

	reviewList: [
		{
			reviewOwnerName: 'Jon from Sales CRM',
			rating: 0,
			review: 'We love this app. very useful and easy to use!',
		},
		{
			reviewOwnerName: 'Best Accounting',
			rating: 0,
			review:
				'Great Support, had a few problem first but they took care of everything and the whole team is running smuthly.',
		},
		{
			reviewOwnerName: 'Marie A.',
			rating: 0,
			review:
				'I have tried a lot of App. and this one has helped me communicate faster with my entire team. I would definitely recommend it.',
		},
		{
			reviewOwnerName: 'Gautam T.',
			rating: 0,
			review: 'I tried app. The app is good. But not recommeded',
		},
		{
			reviewOwnerName: 'Jon from Sales CRM',
			rating: 0,
			review: 'We love this app. very useful and easy to use!',
		},
		{
			reviewOwnerName: 'Best Accounting',
			rating: 0,
			review: 'I tried app. The app is good. But not recommeded',
		},
	],
	noReviewMessage: 'No Review for this app',
	maxReviewDisplay: 3,
};
