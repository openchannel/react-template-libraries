import * as React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';

import { useModalState } from '../../../../lib/hooks';
import { InputContent } from './input-content';
import { Layout } from './layout';
import { PreviewContent } from './preview-content';
import { OcFileUploadProps } from './types';
import { classNames, getUploadParams } from './utils';

import './style.scss';

export const OcFileUpload: React.FC<OcFileUploadProps> = (props) => {
	const { fileType, acceptType, isMultiFile = false } = props;
	const isFileTypeImage = fileType === 'singleImage' || fileType === 'multiImage';
	const acceptImages = acceptType === 'image/*';
	const { isOpened, closeModal, openModal } = useModalState();
	const [cropData, setCropData] = React.useState('');
	const [image, setImage] = React.useState('');
	const [cropFileName, setCropFilename] = React.useState('');
	const isMultiUpload = isFileTypeImage && acceptImages && !isMultiFile;

	const onChangeCropFile = (e: any) => {
		e.preventDefault();
		let files;
		if (e.dataTransfer) {
			files = e.dataTransfer.files;
		} else if (e.target) {
			files = e.target.files;
		}
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as any);
			setCropData(reader.result as any);
		};
		reader.readAsDataURL(files[0]);
		setCropFilename(files[0].name);
	};

	const handleFileSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
		console.log(files.map((f) => f.meta));
		allFiles.forEach((f) => f.remove());
	};

	const handleChangeStatus = ({ meta, file }: any, status: any) => {
		console.log(status, meta, file);
	};

	const fileToModalCallback = (e: any) => {
		onChangeCropFile(e);
		openModal();
	};

	return (
		<>
			<Dropzone
				onChangeStatus={handleChangeStatus}
				getUploadParams={getUploadParams}
				LayoutComponent={Layout}
				onSubmit={handleFileSubmit}
				classNames={classNames}
				InputComponent={(props) => (
					<InputContent
						{...props}
						isOpened={isOpened}
						closeModal={closeModal}
						cropData={cropData}
						setCropData={setCropData}
						image={image}
						fileToModalCallback={fileToModalCallback}
						multiple={isMultiFile}
						cropFileName={cropFileName}
						isMultiUpload={isMultiUpload}
					/>
				)}
				PreviewComponent={PreviewContent}
				maxFiles={10}
				// minSizeBytes={0}
				// maxSizeBytes={1048576}
				multiple={isMultiFile}
				accept={acceptType}
				inputWithFilesContent={() => (
					<span className="file-container__placeholder-browse"> Browse File</span>
				)}
			/>
		</>
	);
};

export default OcFileUpload;
