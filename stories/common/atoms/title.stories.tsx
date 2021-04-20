import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Title, TitleProps } from '../../../src/ui/common';


export default {
	title: 'Title [BEM]',
	component: Title,
} as Meta;

const TitleComponent: Story<TitleProps> = (args) => <Title {...args} />;

export const DefaultTitle = TitleComponent.bind({});
DefaultTitle.args = {
	title: 'Options',
	required: true,
	description: 'Description description description description'
};

export const WithoutRequiredTitle = TitleComponent.bind({});
WithoutRequiredTitle.args = {
	title: 'Options',
	required: false,
	description: 'Description description description description'
};

export const WithoutDescriptionTitle = TitleComponent.bind({});
WithoutDescriptionTitle.args = {
	title: 'Options',
	required: true,
};

// export const CustomIconTitle = TitleComponent.bind({});
// CustomIconTitle.args = {
// 	title: 'Options',
// 	required: true,
// 	infoTitleIconCsv: './assets/img/delete.svg',
// 	description: 'Description description description description'
// };
