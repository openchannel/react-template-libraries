import { forIn, has, get } from 'lodash-es';

/**
 * Abstract service for working with CMS site data.<br>
 * Note (Important!): After creating service execute function {@link #initContent}<br>
 *
 * @example implementation
 *
 * import defaultCMSContent from '.../assets/content/_defaultContent.json';
 * import { CMSSiteContent, siteContent } from '@openchannel/react-common-services';
 *
 * @Injectable({
 *    providedIn: 'root',
 * })
 * export class CmsContentService extends CMSSiteContent {
 *
 *   constructor(private contentAPIService: CMSSiteContent) {
 *       super();
 *       super.initContent();
 *   }
 *
 *   getContentFromAPI(): Promise<any> {
 *      return this.contentAPIService.getContentById('siteId', 'contentId')
 *             .pipe(map(response => response.customData))
 *   }
 *
 *   getContentDefault(): any {
 *         return defaultCMSContent;
 *   }
 * }
 *
 * @example usage
 * constructor(private cmsService: CmsContentService) {...}
 *
 * this.content = this.cmsService
 *   .getContentByPaths({
 *       logoImageURL: 'default-footer.logo',
 *       contentColumns: 'default-footer.menu.items',
 *    });
 * this.cmsData = {
 *    logoImageURL: content.logoImageURL as string;
 *    contentColumns: content.contentColumns as [];
 * }
 *
 * }
 */
export abstract class CMSSiteContent {
	private cmsData = null;

	/**
	 * Get content from API. Result data structure mast be equals data from {@link #getContentDefault}
	 * When will throw an Error or Promise will be empty, service will use data from {@link #getContentDefault}
	 * @return Promise<any> - your CMS data.
	 */
	abstract getContentFromAPI = () => {};

	/**
	 * Get local content. Use when {@link #getContentFromAPI} did not work correctly.
	 * @return any - your CMS data.
	 */
	abstract getContentDefault = () => null;

	/**
	 * Getting content from API or local data.
	 */
	initContent = async () => {
		try {
			return await this.getContentFromAPI();
		} catch {
			this.cmsData = this.getContentDefault();

			return this.cmsData;
		}
	};

	/**
	 * Returns content by paths. See 'usage' section in {@link #CMSSiteContent}
	 */
	getContentByPaths = <P>(paths: P): { [P: string]: any } => {
		return this._findContentByPaths(paths);
	};

	private _findContentByPaths = <P>(paths: P) => {
		const tempPathsData: { [P: string]: any } = { ...paths };

		Object.keys(tempPathsData).forEach((key) => {
			tempPathsData[key] = null;
		});

		forIn(paths, (path, name) => {
			tempPathsData[name] = this._tryGetContentByPath(this.cmsData, path);
		});

		return tempPathsData;
	};

	private _tryGetContentByPath = (cmsData: any, path: any): string | null => {
		if (has(cmsData, path)) {
			return get(cmsData, path);
		} else {
			console.warn(`CMS content. Invalid content path: ${path}`);
			return null;
		}
	};
}
