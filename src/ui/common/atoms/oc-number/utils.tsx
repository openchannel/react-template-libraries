import * as React from 'react';

const notADigit = /^[-]?\d*\.?\d*$/;

export const onInput = (e: React.KeyboardEvent<Record<string, unknown>>) => {
	if (
		e.key.match(notADigit) === null &&
		e.keyCode !== 38 &&
		e.keyCode !== 40 &&
		e.keyCode !== 8 &&
		e.keyCode !== 46
	) {
		e.preventDefault();
	}
};
