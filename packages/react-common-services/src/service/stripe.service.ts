/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { HttpRequestService } from './http-request-services';
// import { OcApiPaths } from '../oc-ng-common-service.module';
// import { HttpHeaders } from '@angular/common/http';
import { api } from '../lib/api';
import {
	ChangeableCreditCardFields,
	ConnectStripeAccountResponse,
	GetMarketplaceStripeSettingsResponse,
	PaymentTaxesResponse,
	Purchase,
	StripeAccountsResponse,
	UserCreditCardsResponse,
} from '../model/api/stripe.model';

const STRIPE_URL = 'v2/stripe-gateway/';

/**
 * Description: API service to work with Stripe.<br>
 *
 * [OpenChannel Documentation]{@link https://support.openchannel.io/documentation/api/#800-stripe-gateway}
 *
 * Endpoints:<br>
 *
 * GET 'v2/stripe-gateway/settings'<br>
 *
 * GET 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
 *
 * DELETE 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
 *
 * GET 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * POST 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * DELETE 'v2/stripe-gateway/developer/this/accounts/{stripeId}'<br>
 *
 * GET 'v2/stripe-gateway/preview'<br>
 *
 */

export const StripeService = {
	/**
	 *
	 * Description: Returns the Stripe settings configured for this marketplace
	 *
	 * ### Example
	 *
	 * `getMarketplaceStripeSettings();`
	 */
	getMarketplaceStripeSettings() {
		return api.get(`${STRIPE_URL}/settings`);
	},

	/**
	 *
	 * Description: Returns a list of credit cards configured for this user
	 *
	 * ### Example
	 *
	 * `getUserCreditCards();`
	 */
	getUserCreditCards() {
		return api.get(`${STRIPE_URL}/user/this/cards`);
	},

	/**
	 *
	 * Description: Adds user credit card, which can be used later
	 *
	 * @param {string} token - The Stripe token returned by the Stripe.js Stripe.card.createToken call
	 * @param {string} isDefault - (optional) Set to true if this should be set to be the default credit card
	 *
	 * ### Example
	 *
	 * `addUserCreditCard('some-token');`
	 */
	addUserCreditCard(token: string, isDefault = true, headers: any) {
		const body = {
			token,
			isDefault,
		};

		return api.post(`${STRIPE_URL}/user/this/cards`, body, {
			headers,
		});
	},

	/**
	 *
	 * Description: Updates fields in user credit card
	 *
	 * @param {string} cardId - Id of the card to update
	 * @param {Partial<ChangeableCreditCardFields>} body - Fields to update in credit card
	 *
	 * ### Example
	 *
	 * `updateUserCreditCard('card-id-123', { address_city: 'New city', address_country: 'New country' });`
	 */
	updateUserCreditCard(cardId: string, body: Partial<ChangeableCreditCardFields>, headers: any) {
		return api.post(`${STRIPE_URL}/user/this/cards/${cardId}`, body, {
			headers,
		});
	},

	/**
	 *
	 * Description: Deletes card from user account
	 *
	 * @param {string} cardId - Id of the card to delete
	 * ### Example
	 *
	 * `deleteUserCreditCard('card-id-123');`
	 */
	deleteUserCreditCard(cardId: string, headers: any) {
		return api.delete(`${STRIPE_URL}/user/this/cards/${cardId}`, {
			headers,
		});
	},

	/**
	 *
	 * Description: Get all developer accounts connected to Stripe
	 *
	 * @returns {Observable<StripeAccountsResponse>} `Observable<StripeAccountsResponse>`
	 *
	 * ### Example
	 *
	 * `getConnectedAccounts();`
	 */
	getConnectedAccounts() {
		return api.get(`${STRIPE_URL}/developer/this/accounts`);
	},

	/**
	 *
	 * Description: Returns a link to Stripe, where developer can connect Stripe account
	 *
	 * @param {string} redirectUrl - The URL to redirect this developer after they have connected their Stripe account
	 *
	 * ### Example
	 *
	 * `connectAccount('https://my-market.com/land-here');`
	 */
	connectAccount(redirectUrl: string, headers: any) {
		const body = { redirectUrl };

		return api.post(`${STRIPE_URL}/developer/this/accounts`, body, {
			headers,
		});
	},

	/**
	 *
	 * Description: Disconnects developer from Stripe
	 *
	 * @param {string} stripeId - The id of the Stripe account to disconnect
	 *
	 * ### Example
	 *
	 * `disconnectAccount('stripe-id');`
	 */
	disconnectAccount(stripeId: string, headers: any) {
		return api.delete(`${STRIPE_URL}/developer/this/accounts/${stripeId}`, { headers });
	},
	/**
	 *
	 * Description: the tax items calculated on the item (only possible after billing address is set).
	 * You can get the tax amounts, subtotal and total.
	 *
	 * @param {string} country iso of the country from the billing data
	 * @param {string} state name of the state
	 * @param {string} appId id of the chosen app
	 * @param {string} modelId id of the price model of the chosen app
	 * @param {string} zipCode postal code of the chosen Address
	 * @param {string} city city of the user
	 *
	 * ### Example
	 *
	 * `getTaxesAndPayment('CA', 'Ontario', '600eef7a7ec0f53371d1ca90', '60b0fa5240b4914e74c8d3fd');`
	 */
	getTaxesAndPayment(
		country: string,
		state: string,
		appId: string,
		modelId: string,
		zipCode: string,
		city: string,
		headers?: any,
	) {
		const query = `country=${country}&state=${state}&appId=${appId}&modelId=${modelId}&zipCode=${zipCode}&city=${city}`;
		return api.get(`${STRIPE_URL}/preview?${query}`, { headers });
	},
	/**
	 *
	 * Description: Returns a link to Stripe, where developer can connect Stripe account
	 *
	 * @param {Purchase} purchaseBody - object with an array of models that contains id of the chosen app and id of the chosen model.
	 * Details at {@link Purchase} model.
	 *
	 * ### Example
	 *
	 * `makePurchase({ models: [{ appId: '5463cee5e4b042e3e26f1e41', modelId: '7349cew5e4b041e3c26y1e49' }]});`
	 */
	makePurchase(purchaseBody: Purchase): Promise<any> {
		return api.post(`${STRIPE_URL}/purchase`, purchaseBody);
	},
};
