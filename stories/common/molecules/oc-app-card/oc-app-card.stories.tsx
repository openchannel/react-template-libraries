import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Story, Meta } from '@storybook/react';

// @ts-ignore
import { app1, app2 } from './mocks';
import { OcAppCard, OcAppCardProps } from '../../../../packages/react-common-components/src/ui/market/molecules/oc-app-card';

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
	app: app1,
};

export const CardWithDescriptionTag = CardComponent.bind({});
CardWithDescriptionTag.args = {
	app: app2,
};
