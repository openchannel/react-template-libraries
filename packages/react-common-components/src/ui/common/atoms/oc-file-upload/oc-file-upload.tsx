import * as React from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { useModalState } from '../../../../lib/hooks';
import { OcFileUploadProps, TypeCall, ExtendedFile } from './types';
import { getAcceptedMethod } from './utils';
import './style.scss';
import { FileRender } from './file-render';
import { ReactComponent as UploadIcon } from '../../../../assets/img/upload_icon.svg';
import OcCropperModalComponent from '../../organisms/oc-image-cropper-modal/oc-image-cropper-modal';
import { CropperModalData } from '../../organisms/oc-image-cropper-modal/types';
import { uniqueId } from 'lodash';

export const OcFileUpload: React.FC<OcFileUploadProps> = (props) => {
	const { id, fileType, acceptType, service, maxWidth = 0, maxHeight = 0, isPrivate = false, onChange, inputValue, isMultiFile = false, hash } = props;
	const { isOpened, closeModal, openModal } = useModalState();
	const [cropData, setCropData] = React.useState<CropperModalData>();
	const [files, setFiles] = React.useState<Array<ExtendedFile>>([]);
	const [border, setBorder] = React.useState<string>('');
	const [_, setStackFiles] = React.useState<string[]>(() => Array.isArray(inputValue) ? inputValue : []);
	const [isImage] = React.useState(fileType === TypeCall.singleImage || fileType === TypeCall.multiImage);

	const onChangeHandler = (value:string) => {
		if(isMultiFile) {
			setStackFiles(prev => {
				const next = [...prev, value];
				onChange(next);
				return next;
			});
		} else {
			onChange(value);
		}
	}

	React.useEffect(() => {
		if( typeof inputValue !== 'undefined' && inputValue.length !== 0 ){
			if (Array.isArray(inputValue)) {
				fileDetails(inputValue);
			} else {
				fileDetails([inputValue]);
			}
		}
	}, []);

	const fileDetails = React.useCallback(async (links: string[]) => {
		const req = links.map((i) => service.fileDetailsRequest(i))
		const responses = await Promise.allSettled(req);

		const filteredFiles = responses.map((r) => {
		if (r.status === 'fulfilled') {
			if(isImage) { 
				return {...r.value.data, preview: r.value.data.fileUrl, lastModified: uniqueId()};
			} else {
				return {...r.value.data, lastModified: uniqueId()};
			}
		} else {
			return { name : 'Error', failed: true };
		}
		}) as Array<ExtendedFile>;
	
		setFiles([...filteredFiles]);
	}, [files]);

	// Get accepted file types for uploading
	const getAcceptFiles: string = React.useMemo(() => {
		if (acceptType !== '' && acceptType) return acceptType;

		if (isImage) return 'image/*';

		return '';
	}, [acceptType, isImage]);

	// Add new file (if filetype == image add preview image after cropping)
	const addFile = React.useCallback((file: ExtendedFile) => {
		
		if (isImage) {
			Object.assign(file, {
				preview: URL.createObjectURL(file)
			})
		}
		setFiles([...files, file]);
	},[files, isImage]);

	// Remove specific file
	const removeFile = React.useCallback((idx: number) => {
		setFiles(files.filter((_, i) => idx !== i));
		if (isMultiFile && typeof inputValue !== 'undefined' ) {
			const removedArr = inputValue.filter((_ : unknown, i:number) => idx !== i);
			onChange(removedArr);
			setStackFiles([...removedArr]);
		}else{
			onChange('');
		}
	},[files, isMultiFile, inputValue]);

	// open modal window with image for cropping 
	const callModal = React.useCallback((file: ExtendedFile) => {
		const reader = new FileReader();
		reader.onload = () => {
			setCropData({ filename: file.name, image: reader.result as string });
			openModal();

			if (isMultiFile) {
				inputRef.current!.value = '';
			}
		}
		reader.readAsDataURL(file);
	},[files, isMultiFile]);

	// call action when drag or insert new file 
	const onDrop = React.useCallback((acceptedFiles: ExtendedFile[]) => {
		setBorder('');
		if (acceptedFiles.length > 0) {
			if (isImage) {
				callModal(acceptedFiles[0]);
			} else if ((fileType === TypeCall.singleFile || fileType === TypeCall.privateSingleFile) && files.length === 0) {
				addFile(acceptedFiles[0]);
			} else if (fileType === TypeCall.multiFile || fileType === TypeCall.multiPrivateFile) {
				setFiles([...files, ...acceptedFiles]);
				inputRef.current!.value = '';
			}
		}
	},[files, isImage, fileType]);

	// Add green border while hover over box
	const onDragOver = () => setBorder('active-border');

	// Show normal border while leaving box or adding item into uploader
	const onDragLeave = () => setBorder('');

	// Add first accepted file if dragged more than one file  
	const onDropRejected = (acceptedFiles: FileRejection[]) => {
		
		const { res, index } = getAcceptedMethod(acceptedFiles, fileType, acceptType, files);

		if (res === 'callModal' && index !== -1) {
			callModal(acceptedFiles[index].file);
		} else if (res === 'addFile' && index !== -1) {
			addFile(acceptedFiles[index].file);
		}
	};

	const { getRootProps, getInputProps, inputRef } = useDropzone({
		onDrop,
		onDragOver,
		onDragLeave,
		onDropRejected,
		accept: getAcceptFiles,
		noClick: true,
		noKeyboard: true,
		multiple: isMultiFile,
	});

	return (
		<div className={`file-container ${files.length === 0 ? 'without-files ' : 'with-files'} ${border}`} {...getRootProps()}>
			{(isMultiFile || files.length === 0) && <>
				<UploadIcon className="file-container__upload-images" />
				<div className="file-container__placeholder">
					<span className="file-container__placeholder-text">Drag &amp; drop file here or &nbsp;</span>
					<label htmlFor={id} className="file-container__placeholder-browse">
						<span> Browse File</span>
						<input id={id} {...getInputProps()} />
					</label>

					<OcCropperModalComponent
						maxWidth={maxWidth}
						maxHeight={maxHeight}
						onClose={closeModal}
						isOpened={isOpened}
						cropData={cropData!}
						onImageCrop={addFile}
					/>
				</div>
			</>}

			{files.length >= 1 && <>
				<aside className="thumbsContainer">
					{files.map((file, idx) => (
						<FileRender
							key={file.lastModified}
							file={file}
							idx={idx}
							removeFile={removeFile}
							service={service}
							isPrivate={isPrivate}
							onChange={onChangeHandler}
							isMultiFile={isMultiFile}
							hash={hash}
						/>
					))}
				</aside>
			</>
			}
		</div>
	);
};
