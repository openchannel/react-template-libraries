import React, { useState } from 'react';
import Cropper from 'react-cropper';

import { OcButtonComponent } from '../../index';

import 'cropperjs/dist/cropper.css';
import './style.scss';

export interface CropperComponentProps {
	setCropper?: any;
	imagePath?: any;
	cropData?: any;
	setCropData?: any;
	getCropData?: any;
}

export const OcImageCropper: React.FC<CropperComponentProps> = (props: CropperComponentProps) => {
	const { setCropper, cropData, getCropData, imagePath } = props;

	const [image, setImage] = useState(imagePath);
	const onChange = (e: any) => {
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
		};
		reader.readAsDataURL(files[0]);
	};

	return (
		<div className="cropper">
			<div className="cropper__header">
				<h4 className="cropper__header-text">Edit Image</h4>
				<input type="file" onChange={onChange} />
			</div>
			<div className="cropper__body">
				<div className="cropper__body-container">
					<Cropper
						style={{ height: 400, width: '100%' }}
						zoomTo={0.2}
						initialAspectRatio={1}
						preview=".img-preview"
						src={image}
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
			<div className="preview-crop-container">
				<div className="box" style={{ width: '50%' }}>
					<h1>Preview</h1>
					<div className="img-preview view-block"></div>
				</div>
				<div className="box" style={{ flexDirection: 'column', width: '50%' }}>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						<h1>Crop</h1>
						<OcButtonComponent onClick={getCropData} text="Crop Image" style={{ width: '30%' }} />
					</div>
					<div className="view-block">
						{cropData && (
							<img style={{ width: '300px', height: '300px' }} src={cropData} alt="cropped" />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
