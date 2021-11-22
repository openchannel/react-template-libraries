import * as React from 'react';
import { ReactComponent as UploadIcon } from '../../../../assets/img/file_icon.svg';
import { Status, TypeFileRender } from './types';


export const FileRender = ({ file, idx, removeFile, service, isPrivate, onChange }: TypeFileRender) => {
	const randThirty = Math.floor(Math.random() * 30);
	const [progress, setProgress] = React.useState<number>(( 'failed' in file && file.failed ) ? 100 : randThirty);
	const [status, setStatus] = React.useState<string>(Status.uploading);
	const timerId = React.useRef<NodeJS.Timeout>();
	const randFinish = React.useRef<number>(Math.round(85 - 0.5 + Math.random() * (97 - 85 + 1)));

	React.useEffect(() => {
		updateProgress(false);
	}, [progress]);

	React.useLayoutEffect(() => {
		if ('fileId' in file ) {
			setProgress(100);
			setStatus(Status.completed);
		} else if (( 'failed' in file && file.failed )) {
			setProgress(100);
			setStatus(Status.failed);
		} else {
			fileLoad(Status.uploading);			
		}

		return function () {
			clearTimeout(timerId.current!);
		};
	}, []);

	const updateProgress = (isFinish: boolean) => {
		if( 'fileId' in file || isFinish) {
			setProgress(100);
			setStatus(Status.completed);
			clearTimeout(timerId.current!);
			return;
		}

		if (( 'failed' in file && file.failed )) {
			setProgress(100);
			setStatus(Status.failed);
			clearTimeout(timerId.current!);
			return;
		}
	
		if (progress < randFinish.current) {
			timerId.current = setTimeout(function () {
				const randCounter = Math.floor(Math.random() * ((randFinish.current - progress) / 2));
				setProgress(prev => prev + randCounter);
			}, 400);
		}		
	};

	const fileLoad = async (loadStatus: string) => {
		if (loadStatus === Status.failed) {
			setProgress(randThirty);
			setStatus(Status.uploading);
		}

		try {
			updateProgress(false);
			const formData = new FormData();
			formData.append('file', file, file.name);
			await service.fileUploadRequest(formData, isPrivate)
				.then((response) => {
					updateProgress(true);
					if( 'data' in response ) {
						onChange(isPrivate ? response.data.fileId : response.data.fileUrl);
					}
				});
		} catch (error) {
			setStatus(Status.failed);
			clearTimeout(timerId.current!);
			throw new Error(error);
		}
	};

	return (
		<div className={`thumb ${status.toLowerCase()}`}>
			<div className="thumb-inner">
				{typeof file.preview !== 'undefined' ? <img src={file.preview} className="img-thumb" /> : <UploadIcon className="img-thumb" />}
				<p className="file-name">{file.name}
					<span className="status">{status}</span>
				</p>
				{status === Status.failed ? <span className="reload-item" onClick={() => fileLoad(Status.failed)} /> : <span className="remove-item" onClick={() => removeFile(idx)} />}
			</div>
			<div className='meter'>
				<span style={{ width: progress + '%' }}><span className="progress" /></span>
			</div>
		</div>
	)
}
