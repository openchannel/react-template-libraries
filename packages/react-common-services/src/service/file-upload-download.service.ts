import { api } from '../lib/api';
import { ReqHeaders } from '../lib/request';
import { config as configService } from '../service/config.service';

const FILES_URL = 'v2/files';
// {marketUrl}/v2/files}
// v2/userAccounts/this
// {fileUrl}

export const fileService = {
	/**
	 *
	 * Description: Get Token and upload file to open channel
	 *
	 * @param {FormData} file - File from formData
	 * @param {boolean} isPrivate
	 * @param {string[]} hash - (optional) file hash
	 *
	 * ### Example:
	 *
	 * `uploadToOpenChannel({file},true, ['na0s78hd09a8shd90ahsd'])`
	 */
	uploadToOpenChannel: (file: FormData, isPrivate: boolean, hash?: string[]) => {
		return fileService
			.getToken()
			.then((res: any) => fileService.prepareUploadReq(res.token, file, isPrivate, hash));
	},

	/**
	 *
	 * Description: Prepare upload request and upload file
	 *
	 * @param {any} token - Token for channel
	 * @param {FormData} file - File from formData
	 * @param {boolean} isPrivate
	 * @param {string[]} hash - (optional) file hash
	 *
	 * ### Example:
	 *
	 * `prepareUploadReq('0a897shd0897ahs09d8has9d7',{file},true, ['na0s78hd09a8shd90ahsd'])`
	 */
	prepareUploadReq: (token: any, file: FormData, isPrivate: boolean, hash?: string[]) => {
		const httpParams = new URLSearchParams();
		if (isPrivate) {
			httpParams.set('isPrivate', `${isPrivate}`);
		}
		if (hash && hash?.length > 0) {
			httpParams.set('hash', hash.join(','));
		}
		const marketUrl = configService.getMarketUrl();
		return api.post(`${marketUrl}/${FILES_URL}`, {
			body: file,
			headers: { 'Upload-Token': `${token}` },
			params: httpParams,
		});
	},

	/**
	 *
	 * Description: Get token for a channel
	 *
	 * ### Example:
	 *
	 * `getToken();`
	 */
	getToken: () => {
		return api.post(`${FILES_URL}/uploadToken`, {});
	},

	/**
	 *
	 * Description: Get file details
	 *
	 * @param {string} fileId,
	 * @param {ReqHeaders} headers
	 * @returns {Observable<FileDetailsResponse>} `Observable<FileDetailsResponse>`
	 *
	 * ### Example:
	 *
	 * `downloadFileDetails('ha98s7dh8a7shd87');`
	 */
	downloadFileDetails: (fileId: string, headers: ReqHeaders) => {
		return api.get(`${FILES_URL}/byIdOrUrl?fileIdOrUrl=${fileId}`, { headers });
	},

	/**
	 *
	 * Description: Download file from provided URL
	 *
	 * @param {string} fileUrl
	 *
	 * ### Example:
	 *
	 * `downloadFileFromUrl('/image.jpg');`
	 */
	downloadFileFromUrl: (fileUrl: string) => {
		return api.get(fileUrl, {});
	},

	/**
	 *
	 * Description: Get file URL
	 *
	 * @param {string} fileId
	 *
	 * ### Example:
	 *
	 * `getFileUrl('/image.jpg');`
	 */
	getFileUrl: (fileId: string) => {
		return api.get(`${FILES_URL}/download?fileId=${fileId}`);
	},
};
