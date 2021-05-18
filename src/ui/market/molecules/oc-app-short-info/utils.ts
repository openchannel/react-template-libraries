import { ParsePrice } from './types';


const isoCurrencyCodes = new Map([
	[ 'USD', '$' ],
	[ 'EUR', '€' ],
	[ 'CNY', '¥' ],
	[ 'GBP', '£' ],
]);

export const parsePrice = ({ type, currency, price, billingPeriod }: ParsePrice): string => {
	if (type === 'free') {
		return 'Free';
	}

	const parsedCurrency = (currency && isoCurrencyCodes.has(currency)) ? isoCurrencyCodes.get(currency) : '';
	let parsedPrice = `${parsedCurrency}${price / 100}`;

	if (billingPeriod) {
		parsedPrice = parsedPrice.concat(`/${billingPeriod.substring(0, 2)}`);
	}

	return parsedPrice;
};

export const truncateText = (string) => {
	// truncate the text and append the ellipsis
	const text = string.split(' ');

	while (text.length > 0 && this.el.scrollHeight > this.el.clientHeight) {
		text.pop();
		this.el.innerText = `${text.join(' ')}…`;
	}
}
