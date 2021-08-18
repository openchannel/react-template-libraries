import { api } from '../lib/api';
import { MarketModel } from '../model/api/market.model';

const MARKET_URL = 'v2/markets';

/**
 * Description: API service for getting Market Data.<br>
 * Endpoints:<br>
 * GET 'v2/markets/this'<br>
 */
export const market = {
	/**
	 * Description: Get Current Market Data
	 * * ### Example
	 * getCurrentMarket()
	 */
	getCurrentMarket: () => {
		return api.get<any, MarketModel>(`${MARKET_URL}/this`);
	},
};
