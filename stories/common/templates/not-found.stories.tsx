import * as React from 'react';
import { Story, Meta } from '@storybook/react';
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
	<NotFound {...args} />
);

export const NotFoundTemplate = Component.bind({});
NotFoundTemplate.args = {
	onClick: action('button clicked'),
	errorImgUrl: './img/not-found-404.svg',
	buttonClassName: 'button-255',
};
