import * as React from 'react';

import { GalleryItem } from '../../models';

import './style.scss';
import { Modal } from 'react-bootstrap';
import { ReactComponent as ArrowRight } from '../../../../assets/img/right.svg';
import { ReactComponent as ArrowLeft } from '../../../../assets/img/left.svg';
import { ReactComponent as Close } from '../../../../assets/img/close.svg';


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

export const OcImageGalleryComponent: React.FC<ImageGalleryProps> = (props) => {
	const { gallery, maxItems = 3 } = props;
	const [show, setShow] = React.useState<boolean>(false);
	const [modalId, setModalId] = React.useState<number>(-1);

	const processedGallery: GalleryItem[] = React.useMemo(
		() => [...gallery].splice(0, maxItems),
		[gallery, maxItems],
	);

	const openModalImage = (id:number) => {
		setModalId(id);
		setShow(true);
	};

	const handleClose = () => {
		setShow(false);
		setModalId(-1)
	};

	const handleSlider = (action: string) => {		
		if(action === 'next') {
			modalId === (processedGallery.length - 1) ? setModalId(0) : setModalId(prev => prev +1);
		} else if (action === 'prev') {
			modalId === 0 ? setModalId(processedGallery.length - 1) : setModalId(prev => prev -1);
		} else {
			setModalId(-1);
		}
	};

	React.useEffect(() => {	
		const _listener = (e: KeyboardEvent) => {
			if (modalId !== -1) {
				e.key === 'ArrowRight' && handleSlider('next');
				e.key === 'ArrowLeft' && handleSlider('prev');
			}
		}
		window.addEventListener('keyup', _listener);
		return () => window.removeEventListener('keyup', _listener);
	}, [handleSlider]);
	

	return (<>
		<div className="image-gallery">
			{processedGallery.map((item, k) => (
				<div key={k} className="image-gallery__item">
					<img src={item.image} alt="icon" className="image-gallery__item-image" onClick={() => openModalImage(k)}/>
					<p className="image-gallery__item-title">{item.title}</p>
					<span className="image-gallery__item-description">{item.description}</span>
				</div>
			))}
			
		</div>
		{modalId !== -1 &&
			<Modal 
				size="xl" 
				show={show} 
				onHide={handleClose}
				centered
				contentClassName="bg-transparent"
				dialogClassName="modal-custom-w"
				>
				<ArrowRight className="gallery-arrow-icon prev-slide" onClick={() => handleSlider('prev')} />
				<Modal.Header className="border-0 py-0 justify-content-end" >
					<Close className="close-modal" onClick={handleClose}/>
				</Modal.Header>
				<Modal.Body className="text-center">
					<img src={processedGallery[modalId].image} alt={processedGallery[modalId].title} className="img-fluid" />
				</Modal.Body>
				<ArrowLeft className="gallery-arrow-icon next-slide" onClick={() => handleSlider('next')} />
			</Modal>
		}
	</>
	);
};

export default OcImageGalleryComponent;
