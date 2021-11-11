import { AxiosResponse } from "axios";

export enum TypeCall {
  singleFile = 'singleFile',
  singleImage = 'singleImage',
  privateSingleFile = 'privateSingleFile',
  multiFile = 'multiFile',
  multiImage = 'multiImage',
  multiPrivateFile = 'multiPrivateFile',
}

type FileType =
	| 'singleFile'
	| 'singleImage'
	| 'privateSingleFile'
	| 'multiFile'
	| 'multiImage'
	| 'multiPrivateFile';

export interface ExtendedFile extends File {
    preview?: string;
}

export interface OcFileUploadProps {
	fileType: FileType;
	acceptType?: string;
	maxFiles: number;
	isMultiFile: boolean;
	maxWidth: number;
	maxHeight: number;
    service: FileUploadService;
    isPrivate: boolean;
}

export interface FoundVirus {
    fileName: string;
    virusName: string;
}

export interface VirusScanResult {
    started: number;
    finished: number;
    status: 'CLEAN' | 'NOT_SCANNED' | 'DIRTY';
    foundViruses: FoundVirus[];
}

/**
 * File Details interface
 *  @property {string} fileId - Unique identifier of file
 *  @property {string} fileUrl - File URL link
 *  @property {string} name - File name
 *  @property {number} size - File size in px
 *  @property {number} uploadDate - File upload date (timestamp)
 *  @property {number} fileUploadProgress - Percentage of file upload process
 *  @property {string} fileIconUrl - URL link for file icon
 *  @property {string} contentType - MIME type for a upload file request
 *  @property {boolean} isPrivate - Flag that show do we need to use file id or url
 *  @property {'PASSED' | 'FAILED'} mimeCheck - result after mime check feature. Can be 'PASSED' or 'FAILED'
 *  @property {VirusScanResult} virusScan - Object that was returned after virus scan check
 *  @property {boolean} isError - Flag that shows up upload was with error or not
 */
 export interface FileDetails {
    fileId: string;
    fileUrl: string;
    name: string;
    size: number;
    uploadDate: number;
    fileUploadProgress: number;
    fileIconUrl: string;
    contentType: string;
    isPrivate: boolean;
    mimeCheck: 'PASSED' | 'FAILED';
    virusScan: VirusScanResult;
    isError: boolean;
}

export interface FileUploadService {
	fileUploadRequest(file: FormData, isPrivate: boolean, hash?: string[]): Promise<FileDetails> | Promise<AxiosResponse<FileDetails>>;
	fileDetailsRequest(fileId: string): Promise<FileDetails> | Promise<AxiosResponse<FileDetails>>;
}
