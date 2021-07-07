import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcFileUpload } from '../../../src/react-common-components/ui/common';

export default {
  title: 'File uploader [BEM]',
  component: OcFileUpload,
} as Meta;

const UploadComponent: Story<any> = (args) => <OcFileUpload {...args} />;

const UploadOneFileComponent: Story<any> = (args) => <OcFileUpload {...args} maxFiles={1} />;

export const SinglePrivateFile = UploadOneFileComponent.bind({});
SinglePrivateFile.args = {
  accept: '*',
  maxSizeBytes: 10000,
};

export const MultipleFiles = UploadComponent.bind({});
MultipleFiles.args = {
  maxFiles: 5,
  accept: '*',
  maxSizeBytes: 10000,
};
