import { fileService } from '@openchannel/react-common-services';

export const mockFileService = {
	fileUploadRequest: (file: FormData, isPrivate: boolean, hash?: string[]) => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				const response = {
					data: {
						contentType: 'image/png',
						fileId: '601ab0a3d0c0c60baf654207/public/61ea9a09159fc0518edb3837.jpeg',
						fileUrl:
							'//dev1-cdn.openchannel.io/601ab0a3d0c0c60baf654207/public/61ea9a09159fc0518edb3837.jpeg',
						isPrivate: false,
						mimeCheck: 'FAILED',
						name: '1438480.jpeg',
						size: 42789,
						uploadDate: 1642764809839,
					},
				};
				resolve(response);
			}, 4000);
		});
	},
	fileDetailsRequest: fileService.downloadFileDetails,
};
export const mockService = { ...fileService, fileDetailsRequest: fileService.downloadFileDetails };
