import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcNumberComponent, InputNumberProps } from '../../../src/react-common-components/ui/common';

export default {
	title: 'Number Input Component [BEM]',
	component: OcNumberComponent,
} as Meta;

const InputComponent: Story<InputNumberProps> = (args) => {
	return <OcNumberComponent {...args} />;
};

export const SimpleNumberInput = InputComponent.bind({});
SimpleNumberInput.args = {
	required: false,
	placeholder: 'Write any number here',
	customClass: '',
};
