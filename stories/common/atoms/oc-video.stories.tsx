import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcVideoComponent, VideoProps } from '../../../src/react-common-components/ui/common';

export default {
  title: 'Video [BEM]',
  component: OcVideoComponent,
} as Meta;

const VideoComponent: Story<VideoProps> = (args) => <OcVideoComponent {...args} />;

export const YoutubeWatchVideo = VideoComponent.bind({});
YoutubeWatchVideo.args = {
  videoUrl: 'https://www.youtube.com/watch?v=9ao4FEaDGhQ',
};
export const YoutubeEmbedVideo = VideoComponent.bind({});
YoutubeEmbedVideo.args = {
  videoUrl: 'https://www.youtube.com/embed/fs2iHMrxYNQ',
};
export const YoutubeShortVideo = VideoComponent.bind({});
YoutubeShortVideo.args = {
  videoUrl: 'https://youtu.be/9ao4FEaDGhQ',
};
export const VimeoVideo = VideoComponent.bind({});
VimeoVideo.args = {
  videoUrl: 'https://vimeo.com/520392165',
};
export const DailymotionVideo = VideoComponent.bind({});
DailymotionVideo.args = {
  videoUrl: 'https://www.dailymotion.com/video/x80czoq',
};
