import * as React from 'react';
import { ILayoutProps } from 'react-dropzone-uploader';

import UploadIcon from '../../../../../assets/img/upload_icon.svg';

import './style.scss';

export const Layout = ({
	input,
	previews,
	dropzoneProps,
	files,
	extra: { maxFiles },
}: ILayoutProps) => {
	return (
		<div>
			<div {...dropzoneProps}>
				<UploadIcon className="file-container__upload-images" />
				{files.length < maxFiles && input}
				{previews}
			</div>
			{/* {files.length > 0 && submitButton} */}
		</div>
	);
};
