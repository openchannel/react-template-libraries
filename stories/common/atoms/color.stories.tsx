import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcColorComponent, ColorProps } from '../../../src/ui/common';

export default {
  title: 'Common/Atoms/Color',
  component: OcColorComponent,
} as Meta;

const ColorComponent: Story<ColorProps> = (args) => {
  return <OcColorComponent {...args} />;
};

export const BasicColorComponent = ColorComponent.bind({});
BasicColorComponent.args = {
  placeholder: 'Enter color value here',
};
