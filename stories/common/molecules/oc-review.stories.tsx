import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ReviewProps } from '../../../packages/react-common-components/src/ui/common';
import OcReviewComponent from '../../../packages/react-common-components/src/ui/common/molecules/oc-review';

export default {
	title: 'Review [BEM]',
	component: OcReviewComponent,
} as Meta;

const ReviewComponent: Story<ReviewProps> = (args) => {
	return <OcReviewComponent {...args} />;
};

export const SimpleReview = ReviewComponent.bind({});
SimpleReview.args = {};

export const FullReview = ReviewComponent.bind({});
FullReview.args = {
	heading: 'Write a review',
	enableButtons: true
};

export const FilledReview = ReviewComponent.bind({});
FilledReview.args = {
	heading: 'Write a review',
	enableButtons: true,
	// @ts-ignore
	reviewData: {
		rating: 400,
		headline: 'Good App!',
		description: 'It works great and looks good too.',
	},
};

