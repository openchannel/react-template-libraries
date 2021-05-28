const notADigit = /^[-]?\d*\.?\d*$/;
export const onInput = (e: any) => {
	console.log(
		e.key.match(notADigit) === null &&
			e.keyCode !== 38 &&
			e.keyCode !== 40 &&
			e.keyCode !== 8 &&
			e.keyCode !== 46,
	);
	console.log(e);
	e.key.match(notADigit) === null &&
	e.keyCode !== 38 &&
	e.keyCode !== 40 &&
	e.keyCode !== 8 &&
	e.keyCode !== 46
		? e.preventDefault()
		: e.target.value;
};
