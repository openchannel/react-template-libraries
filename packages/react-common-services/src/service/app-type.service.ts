import { api } from '../lib/api';
import { QueryUtil } from '../util/query.util';

/**
 * Description: API service for getting App Type model.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/appTypes/{appTypeId}'<br>
 *
 * GET 'v2/appTypes'<br>
 */

const APP_TYPE_URL = 'v2/appTypes';

export const AppTypeService = {
    /**
     *
     * Description: Get App Types list with pagination
     *
     * @param {number} pageNumber - Current page index. Starts from >= 1
     * @param {number} pageLimit - Count users into response. Starts from >= 1.
     * @returns {Observable<Page<AppTypeModelResponse>>} Observable<Page<AppTypeModelResponse>>
     *
     * ### Example
     * ``
     * getAppTypes(1,10);
     * ``
     */
    getAppTypes: (pageNumber: number, pageLimit: number) => {
        const mainUrl = `${APP_TYPE_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
		return api.get(mainUrl);
    },

    /**
     *
     * Description: Get app type by id
     *
     * @param {string} appTypeId - (required)
     * @param {HttpHeaders} headers (optional) (default: empty HttpHeaders object)
     * @returns {Observable<AppTypeModelResponse>} Observable<AppTypeModelResponse>
     * ### Example
     * ``
     * getOneAppType('3v874hy98374vr93');
     * ``
     */
    getOneAppType: (appTypeId: string, headers: any = new Headers({'x-handle-error': '404'})) => {
        const mainUrl = `${APP_TYPE_URL}/${appTypeId}`;
        return api.get(encodeURI(mainUrl), { headers });
    }
};
