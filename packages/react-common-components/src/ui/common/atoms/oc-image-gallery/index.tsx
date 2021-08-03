import * as React from 'react';

import { GalleryItem } from '../../models';

import './style.scss';

export interface ImageGalleryProps {
	/**
	 * Array of the gallery images. Must contain a values: 'image', 'title', 'description'.
	 */
	gallery: GalleryItem[];
	/**
	 * Quantity of images that will be shown
	 * @default 3
	 * */
	maxItems?: number;
}

const OcImageGalleryComponent: React.FC<ImageGalleryProps> = (props) => {
	const { gallery, maxItems = 3 } = props;

	const processedGallery: GalleryItem[] = React.useMemo(
		() => [...gallery].splice(0, maxItems),
		[gallery, maxItems],
	);

	return (
		<div className="image-gallery">
			{processedGallery.map((item, k) => (
				<div key={k} className="image-gallery__item">
					<img src={item.image} alt="icon" className="image-gallery__item-image" />
					<p className="image-gallery__item-title">{item.title}</p>
					<span className="image-gallery__item-description">{item.description}</span>
				</div>
			))}
		</div>
	);
};

export default OcImageGalleryComponent;
