import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcGetStartedComponent, GetStartedProps } from '../../../packages/react-common-components/src/ui/common/molecules';

export default {
	title: 'Get started [BEM]',
	component: OcGetStartedComponent,
} as Meta;

const GetStartedComponent: Story<GetStartedProps> = (args) => {
	const onClick = () => {};
	return <OcGetStartedComponent {...args} onClick={onClick} />;
};

export const DefaultHomePage = GetStartedComponent.bind({});
DefaultHomePage.args = {
	getStartedType: 'home',
	getStartedHeader: 'List Your App in our App Store',
	getStartedDescription:
		'Register as an app developer and submit your app easily with our App Store Developer Portal',
	getStartedButtonText: 'Get Started As An App Developer',
	getStartedImage: './img/get-started.svg',
};
