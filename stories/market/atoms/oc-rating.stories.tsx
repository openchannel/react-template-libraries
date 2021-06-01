import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcRatingComponent, RatingProps } from '../../../src/ui/market/index';

export default {
  title: 'Rating',
  component: OcRatingComponent,
} as Meta;

const RatingComponent: Story<RatingProps> = (args) => <OcRatingComponent {...args} />;

export const SingleRating = RatingComponent.bind({});
SingleRating.args = {
  rating: 3.4,
  reviewCount: 17,
};
SingleRating.storyName = 'Single rating';

export const MultiRating = RatingComponent.bind({});
MultiRating.args = {
  type: 'multi-star',
  rating: 3.4,
  reviewCount: 17,
};
MultiRating.storyName = 'Multi-star rating';
