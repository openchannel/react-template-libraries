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
  videoUrl: 'https://www.youtube.com/watch?v=00F1PQH-MQ8&ab_channel=SickickMusic',
};
export const VimeoVideo = VideoComponent.bind({});
VimeoVideo.args = {
  videoUrl: 'https://vimeo.com/520392165',
};
export const DailymotionVideo = VideoComponent.bind({});
DailymotionVideo.args = {
  videoUrl: 'https://www.dailymotion.com/video/x80czoq',
};
