import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import OcOverallRating, {
	OverallRatingProps,
} from '../../../packages/react-common-components/src/ui/market/organisms/oc-overall-rating/oc-overall-rating';

export default {
	title: 'Overall Rating [BEM]',
	component: OcOverallRating,
} as Meta;

const OverallRatingComponent: Story<OverallRatingProps> = (args) => {
	return <OcOverallRating {...args} />;
};

export const SingleRating = OverallRatingComponent.bind({});
SingleRating.args = {};
SingleRating.storyName = 'Empty Rating';

export const RatingSummary = OverallRatingComponent.bind({});
RatingSummary.args = {
	allReviewSummary: {
		reviewCount: 16,
		rating: 3.43,
		1: 2,
		2: 3,
		3: 2,
		4: 4,
		5: 5,
	},
};
RatingSummary.storyName = 'Rating Summary';
