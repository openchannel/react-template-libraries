import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { Video, VideoProps } from '../../../src/ui/common';

export default {
  title: 'Video [BEM]',
  component: Video,
} as Meta;

const VideoComponent: Story<VideoProps> = (args) => <Video {...args} />;

export const YoutubeVideo = VideoComponent.bind({});
YoutubeVideo.args = {
  videoUrl: 'https://www.youtube.com/embed/DGQwd1_dpuc',
};
export const VimeoVideo = VideoComponent.bind({});
VimeoVideo.args = {
  videoUrl: 'https://player.vimeo.com/video/509986292',
};
export const DailymotionVideo = VideoComponent.bind({});
DailymotionVideo.args = {
  videoUrl: 'https://www.dailymotion.com/embed/video/x80rpmf',
};
