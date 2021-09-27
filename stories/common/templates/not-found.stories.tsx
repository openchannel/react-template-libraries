import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import {
	NotFound,
	NotFoundProps,
} from '../../../packages/react-common-components/src/ui/common/templates';

import './not-found.stories.scss';

export default {
	title: 'Not Found',
	component: NotFound,
} as Meta;

const Component: Story<NotFoundProps> = (args) => (
	<BrowserRouter>
		<NotFound {...args} />
	</BrowserRouter>
);

export const NotFoundTemplate = Component.bind({});
NotFoundTemplate.args = {
	onClick: action('button clicked'),
	companyLogoUrl: './img/company-logo-2x.png',
	errorImgUrl: './img/not_found.svg',
};
