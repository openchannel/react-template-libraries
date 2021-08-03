import * as React from 'react';

import OcButtonComponent from '../../atoms/oc-button';
import OcImageCropper from '../../atoms/oc-image-cropper/index';

import CloseIconSvg from '../../../../assets/img/close-icon.svg';
import ZoomInImg from '../../../../assets/img/zoom-in.svg';
import ZoomOutImg from '../../../../assets/img/zoom-out.svg';

export const OcImageCropperModalContent: React.FC<any> = (props) => {
	const {
		onClose,
		onCancel = onClose,
		// onSubmit,
		confirmButtonText = 'Confirm',
		confirmButtonType = 'primary',
		confirmButtonHide = false,
		rejectButtonText = 'Cancel',
		rejectButtonType = 'secondary',
		rejectButtonHide = false,
		imagePath,
		cropper,
		setCropper,
		getCropData,
		setCropData,
		cropData,
	} = props;

	const zoomIn = () => cropper.zoom(0.1);

	const zoomOut = () => cropper.zoom(-0.1);

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
							imagePath={imagePath}
							getCropData={getCropData}
							cropData={cropData}
							setCropData={setCropData}
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
									onClick={(setCropData as any) || onClose}
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
