import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcSocialLinks, OcSocialLinksProps } from '../../../packages/react-common-components/src/ui/common';

export default {
	title: 'Social links',
	component: OcSocialLinks,
} as Meta;

const Component: Story<OcSocialLinksProps> = (args) => <OcSocialLinks {...args} />;

export const Default = Component.bind({});
Default.args = {
	links: [
		{
			link: 'https://facebook.com',
			iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/facebook-icon.svg',
			// iconAlt: 'facebook',
		},
		{
			link: 'https://twitter.com',
			iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/twitter-icon.svg',
			// iconAlt: 'twitter',
		},
	]
};
