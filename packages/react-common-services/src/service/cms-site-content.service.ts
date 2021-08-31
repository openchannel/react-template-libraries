import { forIn, get, has } from 'lodash-es';

const _findContentByPaths = <P>(data: any, paths: P) => {
	const tempPathsData: { [P: string]: any } = { ...paths };

	Object.keys(tempPathsData).forEach((key) => {
		tempPathsData[key] = null;
	});

	forIn(paths, (path, name) => {
		tempPathsData[name] = _tryGetContentByPath(data, path);
	});

	return tempPathsData;
};

const _tryGetContentByPath = (cmsData: any, path: any): string | null => {
	if (has(cmsData, path)) {
		return get(cmsData, path);
	} else {
		console.warn(`CMS content. Invalid content path: ${path}`);
		return null;
	}
};

export const cmsSiteContent = {
	getContentByPaths:
		(cmsData: any, defaultCmsData: any) =>
		<P>(paths: P) => {
			const data = cmsData || defaultCmsData;

			return _findContentByPaths(data, paths);
		},
};
