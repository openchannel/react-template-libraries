import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcImageCropper } from '../../../packages/react-common-components/src/ui/common';

export default {
	title: 'Image Cropper [BEM]',
	component: OcImageCropper,
} as Meta;

const ImageCropper: Story<any> = (args) => {
	return <OcImageCropper {...args} imagePath={args.imagePath} />;
};

export const CropImage = ImageCropper.bind({});
CropImage.args = {
	imagePath:
		'https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg',
};
