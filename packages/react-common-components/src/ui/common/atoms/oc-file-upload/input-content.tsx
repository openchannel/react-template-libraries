import * as React from 'react';
import { getFilesFromEvent } from 'react-dropzone-uploader';

import OcCropperModalComponent from '../../organisms/oc-image-cropper-modal/oc-image-cropper-modal';

import './style.scss';

export const InputContent = (props: any) => {
	const {
		accept,
		onFiles,
		files,
		multiple,
		isOpened,
		closeModal,
		fileToModalCallback,
		image,
		cropData,
		setCropData,
		cropFileName,
		isMultiUpload,
	} = props;

	const standardFileHandler = async (e: any) => {
		const target = e.target;
		const chosenFiles = await getFilesFromEvent(e);
		onFiles(chosenFiles);
		target.value = null;
	};
	return (
		<>
			<div className="file-container__placeholder">
				<p className="file-container__placeholder-text">
					Drag & drop file or
					<label htmlFor="fuic-bf" className="file-container__placeholder-browse">
						{' Browse File'}
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
					image={image}
					cropData={cropData}
					setCropData={setCropData}
					onFiles={onFiles}
					files={files}
					cropFileName={cropFileName}
				/>
			)}
		</>
	);
};
