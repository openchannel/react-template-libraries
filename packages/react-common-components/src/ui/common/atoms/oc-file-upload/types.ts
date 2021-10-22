type FileType =
	| 'singleFile'
	| 'singleImage'
	| 'privateSingleFile'
	| 'multiFile'
	| 'multiImage'
	| 'multiPrivateFile';

export interface OcFileUploadProps {
	fileType: FileType;
	acceptType?: string;
}
