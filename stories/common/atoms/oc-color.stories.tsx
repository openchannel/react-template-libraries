import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcColorComponent, ColorProps } from '../../../packages/react-common-components/src/ui/common';

export default {
  title: 'Color [BEM]',
  component: OcColorComponent,
} as Meta;

const ColorComponent: Story<ColorProps> = (args) => {
  const [colorValue, onValueChange] = React.useState('');
  return <OcColorComponent {...args} colorValue={colorValue} onValueChange={onValueChange} />;
};

export const BasicColorComponent = ColorComponent.bind({});
BasicColorComponent.args = {
  placeholder: 'Enter color value here',
};