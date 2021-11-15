import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { fileService } from '../../../packages/react-common-services/src/index';
import OcFileUpload from '../../../packages/react-common-components/src/ui/common/atoms/oc-file-upload';
import { OcFileUploadProps } from '../../../packages/react-common-components/src/ui/common/atoms/oc-file-upload/types';




export default {
	title: 'File uploader [BEM]',
	component: OcFileUpload,
} as Meta;

const UploadComponent: Story<OcFileUploadProps> = (args) => <OcFileUpload {...args} />;

// const UploadOneFileComponent: Story<OcFileUploadProps> = (args) => <OcFileUpload {...args} maxFiles={1} />;

const mockFileService = {
	fileUploadRequest: (file: FormData, isPrivate: boolean, hash?: string[]) => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let randBool = Math.random() < 0.5;
				if (randBool) {
					resolve(file);
				} else {
					reject("Uploading has been corrupted, try again...")
				}
			}, 4000);
		});
	}
}


export const SingleImageFile = UploadComponent.bind({});
SingleImageFile.args = {
	service: mockFileService,
	fileType: 'singleImage',
	acceptType: 'image/png,image/gif',
	isMultiFile: false,
	maxWidth: 500,
	maxHeight: 200,
	isPrivate: false,
};

export const MultipleImageFiles = UploadComponent.bind({});
MultipleImageFiles.args = {
	service: mockFileService,
	fileType: 'multiImage',
	isMultiFile: true,
	acceptType: '',
	maxWidth: 500,
	maxHeight: 200,
	isPrivate: false,
};


export const SingleFile = UploadComponent.bind({});
SingleFile.args = {
	fileType: 'singleFile',
	isMultiFile: false,
	service: mockFileService,
	acceptType: 'application/pdf',
	isPrivate: false,
};

export const MultipleFiles = UploadComponent.bind({});
MultipleFiles.args = {
	fileType: 'multiFile',
	isMultiFile: true,
	service: mockFileService,
	// acceptType: 'video/3gpp,video/3gpp2,application/vnd.kde.kchart,image/*',
	isPrivate: false,
};
