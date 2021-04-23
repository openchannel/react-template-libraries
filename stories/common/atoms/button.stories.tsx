import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from '../../../src/ui/common';


export default {
	title: 'Common/Atoms/Buttons [BEM]',
	component: Button,
} as Meta;

const ButtonComponent: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />;

export const Primary = ButtonComponent.bind({});

Primary.args = {
	text: 'Submit',
	type: 'primary',
};

export const Secondary = ButtonComponent.bind({});

Secondary.args = {
	text: 'Cancel',
	type: 'secondary',
};

export const Link = ButtonComponent.bind({});

Link.args = {
	text: 'Submit',
	type: 'link',
};

export const Progress = ButtonComponent.bind({});

Progress.args = {
	text: 'Submit',
	type: 'primary',
	process: true,
};

export const ProgressSecondary = ButtonComponent.bind({});

ProgressSecondary.args = {
	text: 'Submit',
	type: 'secondary',
	process: true,
};
