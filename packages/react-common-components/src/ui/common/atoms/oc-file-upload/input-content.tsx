import * as React from 'react';

import { OcCropperModalComponent } from '../../index';

import './style.scss';

// const Input = ({ isOpened, closeModal, openModal }: any) => {
// 	return (
// 		<>
// 			<div className="file-container__placeholder" onClick={openModal}>
// 				<p className="file-container__placeholder-text">
// 					Drag & drop file or
// 					<span className="file-container__placeholder-browse"> Browse File</span>
// 				</p>
// 			</div>
// 			<OcCropperModalComponent onClose={closeModal} isOpened={isOpened} />
// 		</>
// 	);
// };

export const InputContent = (props: any) => {
	const {
		accept,
		onFiles,
		files,
		// getFilesFromEvent,
		multiple,
		isOpened,
		closeModal,
		fileToModalCallback,
		image,
		cropData,
		setCropData,
	} = props;
	return (
		<>
			<div className="file-container__placeholder">
				<p className="file-container__placeholder-text">
					Drag & drop file or
					<label className="file-container__placeholder-browse">
						{' Browse File'}
						<input
							style={{ display: 'none' }}
							type="file"
							accept={accept}
							multiple={multiple}
							onChange={fileToModalCallback}
						/>
					</label>
				</p>
			</div>
			<OcCropperModalComponent
				onClose={closeModal}
				isOpened={isOpened}
				image={image}
				cropData={cropData}
				setCropData={setCropData}
				onFiles={onFiles}
				files={files}
			/>
		</>
	);
};
