import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

import { OcFooter, OcFooterProps } from '../../../packages/react-common-components/src/ui/common';

export default {
	title: 'Footer',
	component: OcFooter,
} as Meta;

const Wrapper: Story<OcFooterProps> = (args) => (
	<BrowserRouter>
		<OcFooter {...args} />
	</BrowserRouter>
);

export const Component = Wrapper.bind({});

Component.args = {
	socialLinks: [
		{
			link: 'https://facebook.com',
			iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/facebook-icon.svg',
			iconAlt: '',
		},
		{
			link: 'https://twitter.com',
			iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/twitter-icon.svg',
			iconAlt: '',
		},
	],
	cmsData: {
		logoImageURL: './img/logo-company.png',
		columnsDFA: [
			{
				label: 'Browse',
				location: '/',
				items: [
					{
						label: 'Most Popular',
						location: '/',
					},
					{
						label: 'Essential Apps',
						location: '/',
					},
				],
			},
			{
				label: 'Developers',
				location: '/',
				items: [
					{
						label: 'Documentation',
						location: '/',
					},
					{
						label: 'Getting Started',
						location: '/',
					},
					{
						label: 'API Reference',
						location: '/',
					},
					{
						label: 'Sample Code',
						location: '/',
					},
				],
			},
			{
				label: 'Company',
				location: '/',
				items: [
					{
						label: 'Contact Us',
						location: '/',
					},
					{
						label: 'Blog',
						location: '/',
					},
				],
			},
		],
	},
};
