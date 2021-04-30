import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { IDropzoneProps } from 'react-dropzone-uploader';
import font from '../../../src/assets/fonts/Rubik-Black.woff';

import { OcFileUpload } from '../../../src/ui/common';

export default {
  title: 'File uploader [BEM]',
  component: OcFileUpload,
} as Meta;

// const file = new File()
console.log(font);

const UploadComponent: Story<IDropzoneProps> = (args) => <OcFileUpload {...args} />;
export const SinglePrivateFile = UploadComponent.bind({});
SinglePrivateFile.args = {
  initialFiles: [font],
};

export const SingleFileWithData = UploadComponent.bind({});
SingleFileWithData.args = {};

export const MultiPublicImageWithData = UploadComponent.bind({});
MultiPublicImageWithData.args = {};
