import { TypeCall, ExtendedFile } from './types';
import { FileRejection } from 'react-dropzone';

export const getAcceptedMethod = (acceptedFiles: FileRejection[], fileType: string, acceptType: string | undefined, files: ExtendedFile[]) => {

	let index = -1;
	let indexType = -1;

	if (fileType === TypeCall.singleImage && files.length === 0) {
		index = acceptedFiles.findIndex((item: { file: ExtendedFile }) => {
			if (acceptType !== '' && acceptType) {	
				let modifiedType = acceptType!.replaceAll('*','').split(',');
				indexType = modifiedType.findIndex((type) => {
					return item.file.type.toLowerCase().includes(type);
				});
				return item.file.type.toLowerCase().includes(modifiedType[indexType]);

			} else {
				return item.file.type.toLowerCase().includes('image');
			}
		});
		return {
			res: 'callModal',
			index,
		}
	} else if ((fileType === TypeCall.singleFile || fileType === TypeCall.privateSingleFile) && files.length === 0) {
		if (acceptType !== '' && acceptType) {
			let modifiedType = acceptType!.replaceAll('*','').split(',');

			index = acceptedFiles.findIndex((item: { file: ExtendedFile }) => {
				indexType = modifiedType.findIndex((type) => item.file.type.toLowerCase().includes(type));

				return item.file.type.toLowerCase().includes(modifiedType[indexType]);
			});
		} else {
			index = 0;
		}
		return {
			res: 'addFile',
			index,
		}
	}

	return {
		res: 'undefined',
		index,
	}
}