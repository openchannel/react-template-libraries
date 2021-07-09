import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcLabelComponent, LabelProps } from '../../../packages/react-common-components/src/ui/common';

export default {
  title: 'Label',
  component: OcLabelComponent,
} as Meta;

const LabelComponent: Story<LabelProps> = (args) => <OcLabelComponent {...args} />;

export const DefaultLabel = LabelComponent.bind({});
DefaultLabel.args = {
  text: 'Name',
};

export const RequiredLabel = LabelComponent.bind({});
RequiredLabel.args = {
  text: 'Name',
  required: true,
};

export const ChildrenLabel = LabelComponent.bind({});
ChildrenLabel.args = {
  children: 'Name',
};
