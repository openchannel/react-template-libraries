import { fileService } from '@openchannel/react-common-services';

export const mockFileService = {
	fileUploadRequest: (file: FormData, isPrivate: boolean, hash?: string[]) => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let randBool = Math.random() < 0.5;
				if (randBool) {
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
				} else {
					reject('Uploading has been corrupted, try again...');
				}
			}, 4000);
		});
	},
};
export const mockService = fileService;
