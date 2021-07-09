import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcTitleComponent, TitleProps } from '../../../packages/react-common-components/src/ui';

export default {
  title: 'Title',
  component: OcTitleComponent,
} as Meta;

const TitleComponent: Story<TitleProps> = (args) => <OcTitleComponent {...args} />;

export const DefaultTitle = TitleComponent.bind({});
DefaultTitle.args = {
  title: 'Options',
  required: true,
  description: 'Description description description description',
};

export const WithoutRequiredTitle = TitleComponent.bind({});
WithoutRequiredTitle.args = {
  title: 'Options',
  required: false,
  description: 'Description description description description',
};

export const WithoutDescriptionTitle = TitleComponent.bind({});
WithoutDescriptionTitle.args = {
  title: 'Options',
  required: true,
};

export const CustomIconTitle = TitleComponent.bind({});
CustomIconTitle.args = {
  title: 'Options',
  required: true,
  infoTitleIconCsv: './img/delete.svg',
  description: 'Description description description description',
};
