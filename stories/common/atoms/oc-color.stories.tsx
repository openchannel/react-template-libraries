import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ColorProps } from '../../../packages/react-common-components/src/ui/common';
import OcColorComponent from '../../../packages/react-common-components/src/ui/common/atoms/oc-color';

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
