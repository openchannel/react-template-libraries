import { api } from '../lib/api';
import { QueryUtil } from '../util/query.util';

const APP_TYPE_URL = 'v2/appTypes';

export const AppTypeService = {
    getAppTypes: (pageNumber: number, pageLimit: number) => {
        const mainUrl = `${APP_TYPE_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
		return api.get(mainUrl);
    },
    getOneAppType: (appTypeId: string, headers: any = new Headers({'x-handle-error': '404'})) => {
        const mainUrl = `${APP_TYPE_URL}/${appTypeId}`;
        return api.get(encodeURI(mainUrl), { headers });
    }
};
