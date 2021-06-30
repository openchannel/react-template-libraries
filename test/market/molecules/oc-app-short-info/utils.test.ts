import { parsePrice } from '../../../../src/ui/market/lib';

describe('OcAppShortInfo-utils', () => {
	it('should parse price and return Free', () => {
		const res = parsePrice({
			type: 'free',
			price: 0,
		});

		expect(res).toBe('Free');
	});

	it('should parse price without currency', () => {
		const res = parsePrice({
			type: 'not free',
			price: 999,
			billingPeriod: 'weekly',
		});

		expect(res).toBe('9.99/we');
	});

	it('should parse price with currency', () => {
		const res = parsePrice({
			type: 'not free',
			currency: 'USD',
			price: 999,
			billingPeriod: 'weekly',
		});

		expect(res).toBe('$9.99/we');
	});

	it('should parse price without billingPeriod', () => {
		const res = parsePrice({
			type: 'not free',
			currency: 'USD',
			price: 999,
		});

		expect(res).toBe('$9.99');
	});
});
