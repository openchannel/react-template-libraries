import * as React from 'react';
import Dropzone, {getFilesFromEvent, IDropzoneProps} from 'react-dropzone-uploader';
import {useDropzone} from 'react-dropzone';

import { useModalState } from '../../../../lib/hooks';

import { InputContent } from './input-content';
import { Layout } from './layout';
import { PreviewContent } from './preview-content';
import { OcFileUploadProps } from './types';
import { classNames, getUploadParams } from './utils';

import './style.scss';
import {ReactComponent as UploadIcon} from '../../../../assets/img/upload_icon.svg';
import OcCropperModalComponent from '../../organisms/oc-image-cropper-modal/oc-image-cropper-modal';
import {CropperModalData} from '../../organisms/oc-image-cropper-modal/types';

export const OcFileUpload: React.FC<OcFileUploadProps> = (props) => {
	const {fileType, acceptType} = props;
	const isFileTypeImage = fileType === 'singleImage' || fileType === 'multiImage';
	const {isOpened, closeModal, openModal} = useModalState();
	const [cropData, setCropData] = React.useState<CropperModalData>()
	const [files, setFiles] = React.useState<File[]>([]);

	const addFile = (file: File) => {
		setFiles([...files, file])
	}

	const removeFile = (idx: number) => {
		setFiles(files.filter((_, i) => idx !== i))
	}

	const onDrop = (acceptedFiles: File[]) => {
		if (acceptedFiles.length > 0) {
			const file = acceptedFiles[0];
			if (isFileTypeImage) {
				const reader = new FileReader()
				reader.onload = () => {
					setCropData({filename: file.name, image: reader.result as string});
					openModal();
				}
				reader.readAsDataURL(file);
			} else {
				addFile(file);
			}
		}
	};

	const {getRootProps, getInputProps} = useDropzone({onDrop, accept: acceptType})

		return (
		<div className="file-container" {...getRootProps()}>
			<UploadIcon className="file-container__upload-images"/>
			<div className="file-container__placeholder">
				<p className="file-container__placeholder-text">
					Drag & drop file
					<label htmlFor="fuic-bf" className="file-container__placeholder-browse">
						here or<span>{' Browse File'}</span>
						<input
							id="fuic-bf"
							{...getInputProps()}/>
					</label>
				</p>
				{isFileTypeImage && (
					<OcCropperModalComponent
						onClose={closeModal}
						isOpened={isOpened}
						cropData={cropData!}
						onImageCrop={addFile}
					/>
				)}
				{files
					.map((f, idx) => <div onClick={() => removeFile(idx)}>{f.name}</div>)}
			</div>
		</div>
	);
};

export default OcFileUpload;
