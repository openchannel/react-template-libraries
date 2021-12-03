import { api } from '../lib/api';
import { ChartStatisticPeriodModelResponse } from '../model/components/frontend.model';

const FILES_URL = 'v2/stats';

export const chartService = {
    getTimeSeries: (period: string, field: string, dateStartMS: number, dateEndMS: number, appId?:string ) => {
        const query = appId ? '&query=' + encodeURI(JSON.stringify({appId})) : '';
		return api.get(`${FILES_URL}/series/${period}/${field}?start=${String(dateStartMS)}&end=${String(dateEndMS)}${query}`);
	},
	getDateStartByCurrentPeriod(dateEnd: Date, period: ChartStatisticPeriodModelResponse): Date {		
        const dateStart = new Date(dateEnd);
        if (period?.id === 'month') {
            dateStart.setFullYear(dateEnd.getFullYear() - 1);
        } else if (period?.id === 'day') {
            dateStart.setTime(dateStart.getTime() - 31 * 24 * 60 * 60 * 1000);
        } else {
            dateStart.setMonth(dateStart.getTime() - 31 * 24 * 60 * 60 * 1000);
        }
        return dateStart;
    }
};