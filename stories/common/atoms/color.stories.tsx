import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcColorComponent, ColorProps } from '../../../src/ui/common';

export default {
  title: 'Color [BEM]',
  component: OcColorComponent,
} as Meta;

const ColorComponent: Story<ColorProps> = (args) => {
  const [inputColorValue, setInputColorValue] = React.useState('');
  const [inputTextColor, setInputTextColor] = React.useState('');
  return (
    <OcColorComponent
      {...args}
      inputColorValue={inputColorValue}
      setInputColorValue={setInputColorValue}
      inputTextColor={inputTextColor}
      setInputTextColor={setInputTextColor}
    />
  );
};

export const BasicColorComponent = ColorComponent.bind({});
BasicColorComponent.args = {
  placeholder: 'Enter color value here',
};
