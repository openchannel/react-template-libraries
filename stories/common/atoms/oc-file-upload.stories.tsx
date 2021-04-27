import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcFileUpload, FileDetails } from '../../../src/ui/common';

export default {
  title: 'File uploader [BEM]',
  component: OcFileUpload,
} as Meta;

const UploadComponent: Story<any> = (args) => <OcFileUpload {...args} />;

export const SinglePrivateFile = UploadComponent.bind({});
SinglePrivateFile.args = {};

export const SingleFileWithData = UploadComponent.bind({});
SingleFileWithData.args = {};

export const MultiPublicImageWithData = UploadComponent.bind({});
MultiPublicImageWithData.args = {};
