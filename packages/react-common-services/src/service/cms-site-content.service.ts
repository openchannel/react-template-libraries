import { forIn, has, get } from 'lodash-es';

export const CMSSiteContent = {
	cmsData: null,

	getContentFromAPI: () => new Promise(() => {}),
	getContentDefault: () => null,

	initContent: async () => {
		try {
			return await CMSSiteContent.getContentFromAPI();
		} catch {
			CMSSiteContent.cmsData = CMSSiteContent.getContentDefault();

			return CMSSiteContent.cmsData;
		}
	},

	getContentByPaths: <P>(paths: P): { [P: string]: any } => {
		return CMSSiteContent._findContentByPaths(paths);
	},

	_findContentByPaths: <P>(paths: P) => {
		const tempPathsData: { [P: string]: any } = { ...paths };

		Object.keys(tempPathsData).forEach((key) => {
			tempPathsData[key] = null;
		});

		forIn(paths, (path, name) => {
			tempPathsData[name] = CMSSiteContent._tryGetContentByPath(CMSSiteContent.cmsData, path);
		})

		return tempPathsData;
	},

	_tryGetContentByPath: (cmsData: any, path: any): string | null => {
		if (has(cmsData, path)) {
			return get(cmsData, path);
		} else {
			console.warn(`CMS content. Invalid content path: ${path}`);
			return null;
		}
	},

};
