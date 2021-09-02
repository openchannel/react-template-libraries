import { forIn, get, has } from 'lodash-es';

const isImagePath = (path: string): Boolean => (/(?:jpg|gif|png|svg|jpeg|webp)/).test(path);

const getContent = (cmsData: any, path: any) => {
	if (typeof path !== 'string') {
		return get(cmsData, path);
	}

	try {
		if (isImagePath(path)) {
			return `/${get(cmsData, path)}`;
		}
		return get(cmsData, path);
	} catch {
		return get(cmsData, path)
	}
};

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
		return getContent(cmsData, path);
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
