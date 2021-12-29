import { AppsService, FullAppData } from '@openchannel/react-common-components';

export const mockFileService = {
	fileUploadRequest: (file: FormData, isPrivate: boolean, hash?: string[]) => {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				let randBool = Math.random() < 0.5;
				if (randBool) {
					resolve(file);
				} else {
					reject('Uploading has been corrupted, try again...');
				}
			}, 4000);
		});
	},
};

export const mockApps: Partial<FullAppData>[] = [
	{
		appId: '601ab170d0c0c60baf654338',
		version: 5,
		name: 'API Connect Play',
	},
	{
		appId: '601ab170d0c0c60baf654326',
		version: 3,
		name: 'Fuel CRM Gold',
		icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255992b5ad376fff84b6a6.png',
	},
	{
		appId: '60a65b8feb13480b0f615830',
		version: 7,
		name: 'Intersect Connect',
	},
	{
		appId: '601ab171d0c0c60baf65433e',
		version: 13,
		name: 'Lead Accounting',
		icon: '//d3grfap2l5ikgv.cloudfront.net/5f20f7ff579d1a20c527d847/public/5f255adfb5ad376fff84b6cf.png',
	},
	{
		appId: '601ab170d0c0c60baf65432c',
		version: 4,
		name: 'Fuel CRM Lite',
	},
];

export const mockService: AppsService = {
	searchInitialMultiApps: (query: string): Promise<any> => {
		const {
			appId: { $in: appIds },
		} = JSON.parse(query);
		return new Promise((resolve) =>
			resolve({ data: { list: mockApps.filter((app) => appIds.includes(app.appId)) } }),
		);
	},
	searchMultiApps: (searchText: string, query?: string): Promise<any> => {
		const lowerSearch = searchText.toLowerCase();
		const appIds = query ? JSON.parse(query).appId.$nin : [];
		return new Promise((resolve) => {
			const apps = mockApps.filter(
				(app) =>
					!appIds.includes(app.appId) &&
					(app.name?.toLowerCase().includes(lowerSearch) ||
						app.appId?.toLowerCase().includes(lowerSearch)),
			);
			resolve({ data: { list: apps } });
		});
	},
};
