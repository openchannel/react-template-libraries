import { api } from '../lib/api';

const CONFIG_URL = 'v2/config';

const loadMarketUrl = async () => {
	try {
		const response = await api.get(`${CONFIG_URL}/market-url`);
		config.marketUrl = response.data;
		return config.marketUrl;
	} catch (error) {
		console.error('loadMarketUrl error', error);
		return '';
	}
};

export const config = {
	marketUrl: '',
	/**
	 *
	 * Description: Get market url
	 * @returns {string}
	 * * ### Example:
	 * `getMarketUrl();`
	 */
	getMarketUrl: () => {
		if (!config.marketUrl) {
			return loadMarketUrl();
		}
		return config.marketUrl;
	},
};
