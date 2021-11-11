import * as React from 'react';
import {ReactComponent as UploadIcon} from '../../../../assets/img/file_icon.svg';

export const FileRender = ({ file, idx, removeFile, service, isPrivate }: any) => {
	const [progress, setProgress] = React.useState<number>(Math.floor(Math.random() * 30));
	const [status, setStatus] = React.useState<string>('Uploading');
	const timerId = React.useRef<NodeJS.Timeout>();
	const randFinish = React.useRef<number>(Math.round(85 - 0.5 + Math.random() * (97 - 85 + 1)));

	React.useEffect(() => {
		updateProgress(false);
	}, [progress]);

	React.useEffect(() => {
        fileLoad();
		return function() {
			clearTimeout(timerId.current!);
		  };
	  },[]);

    const updateProgress = (isFinish: boolean) => {
		if (isFinish) {
			setProgress(100);
			setStatus('Completed');
			clearTimeout(timerId.current!);
			return;
		}

		if (progress < randFinish.current) {
			timerId.current = setTimeout(function() {
				const randCounter = Math.floor(Math.random() * ((randFinish.current - progress) / 2));
				setProgress(prev => prev+randCounter);
			}, 400);
		}
	};

    const fileLoad = async() => {
        try {
            updateProgress(false);
            const formData = new FormData();
            formData.append('file', file, file.name);
        
            await service.uploadNewFile(formData, isPrivate)
            .then(()=> updateProgress(true));

        } catch (error) {
            throw new Error(error);
        }
    };


	return (
		<div className="thumb">
			<div className="thumb-inner">
			{ typeof file.preview !== 'undefined' ? <img src={file.preview} className="img-thumb" /> : <UploadIcon className="img-thumb" /> }
			<p className="file-name">{file.name}
				<span className="status">{status}</span>	
			</p>
			<span className="remove-item" onClick={() => removeFile(idx)}></span>
			</div>
            <div className="meter">
                <span style={{width:progress + '%'}}><span className="progress"></span></span>
            </div>
		</div>
	)
}
