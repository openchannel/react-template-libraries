import * as React from 'react';

import { OcButtonComponent } from '../../atoms';
import { OcImageCropper } from '../../index';

import CloseIconSvg from '../../../../assets/img/close-icon.svg';
import ZoomInImg from '../../../../assets/img/zoom-in.svg';
import ZoomOutImg from '../../../../assets/img/zoom-out.svg';

export const OcImageCropperModalContent: React.FC<any> = (props) => {
	const {
		onClose,
		onCancel = onClose,
		onFiles,
		confirmButtonText = 'Confirm',
		confirmButtonType = 'primary',
		confirmButtonHide = false,
		rejectButtonText = 'Cancel',
		rejectButtonType = 'secondary',
		rejectButtonHide = false,
		image,
		setCropData,
		cropData,
		files,
		cropFileName,
	} = props;

	const [cropper, setCropper] = React.useState<any>();
	const getCropData = () => {
		if (typeof cropper !== 'undefined') {
			setCropData(cropper.getCroppedCanvas().toDataURL());
		}
	};
	const zoomIn = () => cropper.zoom(0.1);

	const zoomOut = () => cropper.zoom(-0.1);

	const b64toFile = (b64File: string) => {
		if (b64File !== undefined) {
			const i = b64File.indexOf('base64,');
			const buffer = Buffer.from(b64File.slice(i + 7), 'base64');
			const file = new File([buffer], cropFileName, {type: 'image/jpeg'});
			return file;
		}
}
	console.log(b64toFile(cropData));

	const handleSubmitAfterCrop = () => {
		files.push(b64toFile(cropData));
		onFiles(files);
		console.log('FILES ARRAY', files);
		
		onClose();
	};
	return (
		<>
			<div className="cropper">
				<div className="cropper__header">
					<h4 className="cropper__header-text">Edit Image</h4>
					<CloseIconSvg
						role="button"
						aria-label="close button"
						className="cropper__header-close"
						onClick={onClose}
					/>
				</div>
				<div className="cropper__body">
					<div className="cropper__body-container">
						<div className="cropper__body-size">
							<div className="cropper__body-resolution">
								croppedImageHeight p X croppedImageWidth p
							</div>
							<div className="cropper__body-zoom">
								<a onClick={zoomIn}>
									<ZoomInImg />
								</a>
								<a onClick={zoomOut}>
									<ZoomOutImg />
								</a>
							</div>
						</div>
						<OcImageCropper
							setCropper={setCropper}
							image={image}
							getCropData={getCropData}
							cropData={cropData}
							// setCropData={setCropData}
						/>
						<div className="confirmation-modal__button-container">
							{!rejectButtonHide && (
								<OcButtonComponent
									type={rejectButtonType}
									text={rejectButtonText}
									onClick={onCancel || onClose}
									customClass="confirmation-modal__button"
								/>
							)}
							{!confirmButtonHide && (
								<OcButtonComponent
									type={confirmButtonType}
									text={confirmButtonText}
									onClick={handleSubmitAfterCrop}
									customClass="confirmation-modal__button"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
