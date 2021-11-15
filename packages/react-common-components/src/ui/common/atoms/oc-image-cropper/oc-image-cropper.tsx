import React from 'react';
import Cropper from 'react-cropper';

import 'cropperjs/dist/cropper.css';
import './style.scss';

export interface CropperComponentProps {
	setCropper?: any;
	cropper?: any;
	image?: any;
	maxWidth?: number;
	maxHeight?: number;
}

export const OcImageCropper: React.FC<CropperComponentProps> = (props: CropperComponentProps) => {
	const { image, setCropper, maxWidth, maxHeight } = props;
	const ratio = maxWidth && maxHeight ? maxWidth / maxHeight : NaN;

	return (
		<div className="cropper">
			<div className="cropper__body">
				<div className="cropper__body-container">
					<Cropper
						style={{ height: 400, width: '100%' }}
						zoomTo={0.2}
						initialAspectRatio={1}
						preview=".img-preview"
						src={image}
						aspectRatio={ratio}
						viewMode={1}
						minCropBoxHeight={10}
						minCropBoxWidth={10}
						background={false}
						responsive={true}
						autoCropArea={1}
						checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
						onInitialized={(instance) => {
							setCropper(instance);
						}}
						guides={true}
					/>
				</div>
			</div>
		</div>
	);
};
