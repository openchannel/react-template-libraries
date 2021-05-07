import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcColorComponent, ColorProps } from '../../../src/ui/common';

export default {
  title: 'Common/Molecules/Color',
  component: OcColorComponent,
} as Meta;

const ColorComponent: Story<ColorProps> = (args) => {
  return <OcColorComponent {...args} value="#FFF" />;
};

export const BasicColorComponent = ColorComponent.bind({});
BasicColorComponent.args = {};
