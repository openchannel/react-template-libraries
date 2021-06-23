import * as React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';

import { InputContent } from './input-content';
import { Layout } from './layout';
import { PreviewContent } from './preview-content';
import { OcFileUploadProps } from './types';
import { classNames, getUploadParams } from './utils';

import './style.scss';

export const OcFileUpload: React.FC<OcFileUploadProps> = (props) => {
	const {
		// fileType,
		// acceptType,
		// isMultiFile = false,
	} = props;

	// const isFileTypeImage = fileType === 'singleImage' || fileType === 'multiImage';
	// const accept = acceptType || (isFileTypeImage ? 'image/*' : '*/*');

	const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
		console.log(files.map((f) => f.meta));
		allFiles.forEach((f) => f.remove());
	};

	return (
		<Dropzone
			getUploadParams={getUploadParams}
			LayoutComponent={Layout}
			onSubmit={handleSubmit}
			classNames={classNames}
			inputContent={InputContent}
			PreviewComponent={PreviewContent}
			maxFiles={10}
			minSizeBytes={0}
			maxSizeBytes={5000}
			// accept={accept}
			inputWithFilesContent={() => (
				<span className="file-container__placeholder-browse"> Browse File</span>
			)}
		/>
	);
};
