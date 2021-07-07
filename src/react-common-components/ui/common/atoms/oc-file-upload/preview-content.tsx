import * as React from 'react';
import { IFileWithMeta, IMeta, IPreviewProps } from 'react-dropzone-uploader';

import CloseIcon from '../../../../../assets/img/close-icon.svg';
import DefaultFileIcon from '../../../../../assets/img/file_icon.svg';
import StandardAppIcon from '../../../../../assets/img/standard-app-icon.svg';

import { getUploadParams } from './utils';

import './style.scss';

export const PreviewContent = (props: IPreviewProps) => {
	const { fileWithMeta }: { fileWithMeta: IFileWithMeta } = props;
	const { meta }: { meta: IMeta } = props;
	const { canCancel, canRemove }: { canCancel: boolean; canRemove: boolean } = props;

	return (
		<div className="file-container__upload-item">
			{fileWithMeta.meta &&
				(fileWithMeta.meta.status === 'done' ? (
					<StandardAppIcon className="app-icon" />
				) : (
					<DefaultFileIcon className="app-icon" />
				))}
			{fileWithMeta.meta && (
				<div className="file-container__upload-item-type">
					<span className="file-container__upload-item-name">{fileWithMeta.meta.name}</span>
					<div className="file-container__upload-item-status">
						{fileWithMeta.meta.status !== 'done' ? 'Uploading' : 'Complete'}
					</div>
				</div>
			)}

			<div className="dzu-previewStatusContainer">
				{Boolean(getUploadParams) && (
					<progress
						max={100}
						value={
							fileWithMeta.meta.status === 'done' || fileWithMeta.meta.status === 'headers_received'
								? 100
								: fileWithMeta.meta.percent
						}
					/>
				)}

				{fileWithMeta.meta.status === 'uploading' && canCancel && (
					<CloseIcon className="dzu-previewButton" onClick={fileWithMeta.remove} />
				)}
				{meta.status !== 'preparing' &&
					meta.status !== 'getting_upload_params' &&
					meta.status !== 'uploading' &&
					canRemove && <CloseIcon className="dzu-previewButton" onClick={fileWithMeta.remove} />}
			</div>
		</div>
	);
};

export default PreviewContent;
