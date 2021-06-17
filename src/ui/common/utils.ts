export const truncateWithHTML = (htmlText: string, truncateTo: number): string => {
	const substrings = htmlText.split(/(<[^>]*>)/g);
	let count = 0;
	const truncated = [];
	for (const substr of substrings) {
		if (!substr.startsWith('<')) {
			if (count > truncateTo) {
				continue;
			} else if (substr.length > truncateTo - count - 1) {
				truncated.push(`${substr.substring(0, truncateTo - count)}...`);
				return truncated.join('');
			} else {
				truncated.push(substr);
			}
			count += substr.length;
		} else {
			truncated.push(substr);
		}
	}
	return truncated.join('');
};
