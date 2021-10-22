import * as React from 'react';
import { getFilesFromEvent } from 'react-dropzone-uploader';

import OcCropperModalComponent from '../../organisms/oc-image-cropper-modal/oc-image-cropper-modal';

import './style.scss';

export const InputContent = (props: any) => {
	const {
		accept,
		onFiles,
		multiple,
		isOpened,
		closeModal,
		fileToModalCallback,
		cropData,
		isMultiUpload,
	} = props;

	const standardFileHandler = (e: any) => {
		const target = e.target;
		const chosenFiles = getFilesFromEvent(e);
		onFiles(chosenFiles);
		target.value = null;
	};

	return (
		<>
			<div className="file-container__placeholder">
				<p className="file-container__placeholder-text">
					Drag & drop file
					<label htmlFor="fuic-bf" className="file-container__placeholder-browse">
						here or<span>{' Browse File'}</span>
						<input
							id="fuic-bf"
							style={{ display: 'none' }}
							type="file"
							accept={accept}
							multiple={multiple}
							onChange={isMultiUpload ? fileToModalCallback : standardFileHandler}
						/>
					</label>
				</p>
			</div>
			{isMultiUpload && (
				<OcCropperModalComponent
					onClose={closeModal}
					isOpened={isOpened}
					cropData={cropData}
					onImageCrop={onFiles}
				/>
			)}
		</>
	);
};
