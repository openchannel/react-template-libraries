const isoCurrencyCodes = new Map([
	['USD', '$'],
	['EUR', '€'],
	['CNY', '¥'],
	['GBP', '£'],
]);

interface ParsePrice {
	type?: string;
	price: number;
	currency?: string;
	billingPeriod?: string | 'daily' | 'weekly' | 'monthly' | 'annually';
}

export const parsePrice = ({ type, currency, price, billingPeriod }: ParsePrice): string => {
	if (type === 'free') {
		return 'Free';
	}

	const parsedCurrency =
		currency && isoCurrencyCodes.has(currency) ? isoCurrencyCodes.get(currency) : '';
	let parsedPrice = `${parsedCurrency}${price / 100}`;

	if (billingPeriod) {
		parsedPrice = parsedPrice.concat(`/${billingPeriod.substring(0, 2)}`);
	}
	return parsedPrice;
};

export const validateRouterLink = (link: string) => {
	if (link[link.length - 1] === '/') return link;
	return `${link}/`;
};

export const textEllipsis = {
	'white-space': 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
};
