import * as React from 'react';

import { OcCropperModalComponent } from '../../index';

import './style.scss';

export const InputContent = ({ isOpened, closeModal, openModal }: any) => {
	return (
		<>
			<div className="file-container__placeholder" onClick={openModal}>
				<p className="file-container__placeholder-text">
					Drag & drop file or
					<span className="file-container__placeholder-browse"> Browse File</span>
				</p>
			</div>
			<OcCropperModalComponent onClose={closeModal} isOpened={isOpened} />
		</>
	);
};
