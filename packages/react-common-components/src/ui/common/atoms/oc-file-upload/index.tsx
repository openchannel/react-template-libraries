import * as React from 'react';
import Dropzone, { IDropzoneProps /* getFilesFromEvent */ } from 'react-dropzone-uploader';

import { useModalState } from '../../../../lib/hooks';
import { InputContent } from './input-content';
import { Layout } from './layout';
import { PreviewContent } from './preview-content';
import { OcFileUploadProps } from './types';
import { classNames, getUploadParams } from './utils';

import './style.scss';

const OcFileUpload: React.FC<OcFileUploadProps> = () => {
	// const {
	// fileType,
	// acceptType,
	// isMultiFile = false,
	// } = props;
	// const isFileTypeImage = fileType === 'singleImage' || fileType === 'multiImage';
	// const accept = acceptType || (isFileTypeImage ? 'image/*' : '*/*');

	const { isOpened, closeModal, openModal } = useModalState();
	const [cropper, setCropper] = React.useState<any>();
	const [cropData, setCropData] = React.useState();

	const getCropData = () => {
		if (typeof cropper !== 'undefined') {
			setCropData(cropper.getCroppedCanvas().toDataURL());
			console.log(cropper);
		}
	};

	const handleFileSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
		console.log(files.map((f) => f.meta));
		allFiles.forEach((f) => f.remove());
	};

	const handleChangeStatus = ({ meta, file }: any, status: any) => {
		console.log(status, meta, file);
	};

	return (
		<>
			<Dropzone
				onChangeStatus={handleChangeStatus}
				getUploadParams={getUploadParams}
				LayoutComponent={Layout}
				onSubmit={handleFileSubmit}
				classNames={classNames}
				inputContent={(props) => (
					<InputContent
						{...props}
						isOpened={isOpened}
						closeModal={closeModal}
						openModal={openModal}
						getCropData={getCropData}
						setCropper={setCropper}
						cropData={cropData}
						setCropData={setCropData}
					/>
				)}
				PreviewComponent={PreviewContent}
				maxFiles={10}
				minSizeBytes={0}
				maxSizeBytes={5000}
				// accept={accept}
				inputWithFilesContent={() => (
					<span className="file-container__placeholder-browse"> Browse File</span>
				)}
			/>
		</>
	);
};

export default OcFileUpload;
