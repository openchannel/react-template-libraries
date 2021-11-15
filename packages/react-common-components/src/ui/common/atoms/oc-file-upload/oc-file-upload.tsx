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


export const OcFileUpload: React.FC<OcFileUploadProps> = (props) => {
	const { fileType, acceptType, service, isMultiFile = true, maxWidth = 0, maxHeight = 0, isPrivate = false, onChange} = props;
	const { isOpened, closeModal, openModal } = useModalState();
	const [cropData, setCropData] = React.useState<CropperModalData>();
	const [files, setFiles] = React.useState<ExtendedFile[]>([]);
	const [border, setBorder] = React.useState<string>('');

	// Get accepted file types for uploading
	const getAcceptFiles: string = React.useMemo(() => {
		if (acceptType !== '' && acceptType) return acceptType;

		if (fileType === TypeCall.singleImage || fileType === TypeCall.multiImage) return 'image/*';

		return '';
	}, [acceptType, fileType]);

	// Add new file (if filetype == image add preview image after cropping)
	const addFile = (file: ExtendedFile) => {
		if (fileType === TypeCall.singleImage || fileType === TypeCall.multiImage) {
			Object.assign(file, {
				preview: URL.createObjectURL(file)
			})
		}

		setFiles([...files, file]);
	};

	// Remove specific file
	const removeFile = (idx: number) => {
		setFiles(files.filter((_, i) => idx !== i));
	};

	// open modal window with image for cropping 
	const callModal = (file: ExtendedFile) => {
		const reader = new FileReader();
		reader.onload = () => {
			setCropData({ filename: file.name, image: reader.result as string });
			openModal();

			if (isMultiFile) {
				inputRef.current!.value = '';
			}
		}
		reader.readAsDataURL(file);
	};

	// call action when drag or insert new file 
	const onDrop = (acceptedFiles: ExtendedFile[]) => {
		setBorder('');
		if (acceptedFiles.length > 0) {
			if (fileType === TypeCall.singleImage || fileType === TypeCall.multiImage) {
				callModal(acceptedFiles[0]);
			} else if ((fileType === TypeCall.singleFile || fileType === TypeCall.privateSingleFile) && files.length === 0) {
				addFile(acceptedFiles[0]);
			} else if (fileType === TypeCall.multiFile) {
				setFiles([...files, ...acceptedFiles]);
				inputRef.current!.value = '';
			}
		}
	};

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
					<label htmlFor="fuic-bf" className="file-container__placeholder-browse">
						<span> Browse File</span>
						<input id="fuic-bf" {...getInputProps()} />
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
							onChange={onChange}
						/>
					))}
				</aside>
			</>
			}
		</div>
	);
};
