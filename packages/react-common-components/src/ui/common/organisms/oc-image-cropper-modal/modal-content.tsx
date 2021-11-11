import * as React from 'react';
import {ReactComponent as CloseIconSvg} from '../../../../assets/img/close-icon.svg';
import {ReactComponent as ZoomInImg} from '../../../../assets/img/zoom-in.svg';
import {ReactComponent as ZoomOutImg} from '../../../../assets/img/zoom-out.svg';
import OcButtonComponent from '../../atoms/oc-button/oc-button';
import OcImageCropper from '../../atoms/oc-image-cropper';
import {CropperModalProps} from './types';
import {noop} from 'lodash-es';

export const OcImageCropperModalContent: React.FC<CropperModalProps> = (props) => {
	const {
		onClose,
		onCancel = onClose,
		onImageCrop = noop,
		confirmButtonText = 'Confirm',
		confirmButtonType = 'primary',
		confirmButtonHide = false,
		rejectButtonText = 'Cancel',
		rejectButtonType = 'secondary',
		rejectButtonHide = false,
		cropData,
		maxWidth,
		maxHeight,
	} = props;

	const [cropper, setCropper] = React.useState<any>();

	const zoomIn = () => cropper.zoom(0.1);

	const zoomOut = () => cropper.zoom(-0.1);

	const b64toFile = (b64File: string) => {
		if (b64File !== undefined) {
			const i = b64File.indexOf('base64,');
			const buffer = Buffer.from(b64File.slice(i + 7), 'base64');
			return new File([buffer], cropData.filename, {type: 'image/jpeg'});
		} else {
			return b64File;
		}
	};

	const handleSubmitAfterCrop = () => {
		const options = {
			height:maxHeight, 
			width:maxWidth, 
		};
		
		onImageCrop(b64toFile(cropper.getCroppedCanvas(options).toDataURL()));
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
							<div className="cropper__body-resolution" >{(maxWidth && maxHeight) && maxWidth + 'px x ' + maxHeight + 'px'}</div>
							<div className="cropper__body-zoom">
								<span onClick={zoomIn}>
									<ZoomInImg />
								</span>
								<span onClick={zoomOut}>
									<ZoomOutImg />
								</span>
							</div>
						</div>
						<OcImageCropper setCropper={setCropper} image={cropData.image} maxWidth={maxWidth} maxHeight={maxHeight}/>
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
