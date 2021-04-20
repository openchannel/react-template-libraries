import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { ImageGallery, ImageGalleryProps, GalleryItem } from '../../../src/ui/common';


export default {
	title: 'Image Gallery [BEM]',
	component: ImageGallery,
} as Meta;

const ImageGalleryComponent: Story<ImageGalleryProps> = (args) => <ImageGallery {...args} />;

const imageItem: GalleryItem = {
	image: './src/assets/img/get-started.svg',
	title: 'Test App Image',
	description: 'Improve and extend your experience right from your own UI'
};

export const SmallGallery = ImageGalleryComponent.bind({});
SmallGallery.args = {
	gallery: [imageItem, imageItem, imageItem],
	maxItems: 3
};

export const ExtendedGallery = ImageGalleryComponent.bind({});
ExtendedGallery.args = {
	gallery: [imageItem, imageItem, imageItem, imageItem, imageItem, imageItem],
	maxItems: 5
};
