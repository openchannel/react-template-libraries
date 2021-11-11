import { TypeCall, ExtendedFile } from './types';
import { FileRejection} from 'react-dropzone';

export const getAcceptedMethod = (acceptedFiles:FileRejection[], fileType:string, acceptType: string | undefined, files:ExtendedFile[]) => {

	let index = -1;
	if (fileType === TypeCall.singleImage && files.length === 0) {
		index = acceptedFiles.findIndex((item: { file: ExtendedFile }) => {
			if (acceptType !== '' && acceptType) {
				return acceptType.includes(item.file.type);
			}else{
				return item.file.type.toLowerCase().includes('image');
			}
		});
		return {
			res: 'callModal',
			index,
		}
	} else if((fileType === TypeCall.singleFile || fileType === TypeCall.privateSingleFile)  && files.length === 0) {
		if (acceptType !== '' && acceptType) {
			index = acceptedFiles.findIndex((item: { file: ExtendedFile }) => acceptType.includes(item.file.type));
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
