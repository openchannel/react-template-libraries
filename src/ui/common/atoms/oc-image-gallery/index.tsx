import * as React from 'react';

import './style.scss';

export interface GalleryItem {
  title: string;
  description: string;
  image: string;
}

export interface ImageGalleryProps {
  /**
   * Array of the gallery images. Must contain a values:
   * 'image', 'title', 'description'
   */
  gallery: GalleryItem[];
  /**
   * Quantity of images that will be shown
   * @default 3
   * */
  maxItems?: number;
}

export const OcImageGalleryComponent: React.FC<ImageGalleryProps> = (props) => {
  const { gallery, maxItems = 3 } = props;

  const processedGallery: GalleryItem[] = React.useMemo(() => [...gallery].splice(0, maxItems), [
    gallery,
    maxItems,
  ]);

  return (
    <div className="image-gallery">
      {processedGallery.map((item, k) => (
        <div key={k} className="image-gallery__item">
          <img src={item.image} height="192" alt="icon" className="image-gallery__item-image" />
          <p className="image-gallery__item-title">{item.title}</p>
          <span className="image-gallery__item-description">{item.description}</span>
        </div>
      ))}
    </div>
  );
};
