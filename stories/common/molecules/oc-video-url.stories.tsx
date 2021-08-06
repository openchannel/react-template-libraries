import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { VideoUrlProps } from '../../../packages/react-common-components/src/ui/common/molecules';
import OcVideoUrlComponent from '../../../packages/react-common-components/src/ui/common/molecules/oc-video-url';

export default {
	title: 'Video Url component [BEM]',
	component: OcVideoUrlComponent,
} as Meta;

const VideoUrlComponent: Story<VideoUrlProps> = (args) => {
	const [value, setValue] = React.useState(args.videoUrl);

	return <OcVideoUrlComponent {...args} value={value} onChange={setValue} />;
};

export const DefaultVideoUrl = VideoUrlComponent.bind({});
DefaultVideoUrl.args = {
	placeholder: 'Enter your video url here',
	videoUrl: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
	withoutPreview: false,
};

export const UrlWithoutPreview = VideoUrlComponent.bind({});
UrlWithoutPreview.args = {
	placeholder: 'Enter your video url here',
	videoUrl: 'https://coub.com/view/1po8m3',
	withoutPreview: true,
};

export const EmptyField = VideoUrlComponent.bind({});
EmptyField.args = {
	placeholder: 'Enter your video url here',
	videoUrl: '',
	withoutPreview: true,
};
