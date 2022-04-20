/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ReqHeaders } from '../lib/request';

import { api } from '../lib/api';

const TRANSACTIONS_URL = 'v2/transactions';
/**
 * Description: API service to work with Transactions.<br>
 *
 * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#426-transactions}
 *
 * Endpoints:<br>
 *
 * GET 'v2/transactions'<br>
 *
 * GET 'v2/transactions/{transactionId}'<br>
 *
 * POST 'v2/transactions/{transactionId}'<br>
 *
 * DELETE 'v2/transactions/{transactionId}'<br>
 */
export const TransactionsService = {
	/**
	 *
	 * Description: Returns the list of transactions for the current user
	 *
	 * @param pageNumber - (optional) Current page index. Starts from >= 1.
	 * @param limit - (optional) Count apps into response. Starts from >= 1.
	 * @param sort - (optional) Sort apps by specific field.
	 * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#381-sort-document}
	 * @param query - (optional) Your specific search query.
	 * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#380-query-document}
	 *
	 * ### Example
	 *
	 * `getTransactionsList(1, 10, { date: 1 }, { type: 'payment' });`
	 */
	getTransactionsList(pageNumber = 1, limit = 100, sort: any = {}, query: any = {}) {
		const params = {
			pageNumber:String(pageNumber),
			limit: String(limit),
			sort:JSON.stringify(sort),
			query:JSON.stringify(query),
		};

		return api.get(`${TRANSACTIONS_URL}`, { params });
	},

	/**
	 *
	 * Description: Returns a transaction by the id
	 *
	 * @param {string} transactionId - The id of the transaction to be returned
	 * @param {ReqHeaders} headers - (optional) HTTP headers for the request
	 *
	 * ### Example
	 *
	 * `getTransactionById('transaction-id');`
	 */
	getTransactionById(transactionId: string, headers: ReqHeaders) {
		return api.get(`${TRANSACTIONS_URL}/${transactionId}`, { headers });
	},

	/**
	 *
	 * Description: Updates a transaction by the id
	 *
	 * @param {string} transactionId - The id of the transaction to be updated
	 * @param {string} customData - A custom JSON object to attach to this transaction
	 * @param {ReqHeaders} headers - (optional) HTTP headers for the request
	 *
	 * ### Example
	 *
	 * `updateTransactionById('transaction-id', { department: 'billing' });`
	 */
	updateTransactionById(transactionId: string, customData: any, headers: ReqHeaders) {
		return api.post(`${TRANSACTIONS_URL}/${transactionId}`, { body: customData, headers });
	},

	/**
	 *
	 * Description: Deletes a transaction by the id
	 *
	 * @param {string} transactionId - The id of the transaction to be deleted
	 * @param {HttpHeaders} headers - (optional) HTTP headers for the request
	 * @returns {Promise<{}>} `Promise<{}>`
	 *
	 * ### Example
	 *
	 * `deleteTransactionById('transaction-id');`
	 */
	deleteTransactionById(transactionId: string, headers: ReqHeaders) {
		return api.delete(`${TRANSACTIONS_URL}/${transactionId}`, { headers });
	},
};
