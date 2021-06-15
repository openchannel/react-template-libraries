import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';
import { app1, app2 } from './mocks';
import { OcAppCard, OcAppCardProps } from '../../../../src/ui/common/molecules';

export default {
	title: 'App Card [BEM]',
	component: OcAppCard,
} as Meta;

const CardComponent: Story<OcAppCardProps> = (args) => {
	return (
		<BrowserRouter>
			<OcAppCard {...args} />
		</BrowserRouter>
	);
};

export const Card = CardComponent.bind({});
Card.args = {
	appIcon: './img/standard-app-icon.svg',
	app: app1,
};

export const CardWithDescriptionTag = CardComponent.bind({});
CardWithDescriptionTag.args = {
	appIcon: './img/standard-app-icon.svg',
	app: app2,
};
