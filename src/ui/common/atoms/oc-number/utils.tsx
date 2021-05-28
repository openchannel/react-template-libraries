let lastValidInputValue: string;
let selectedDot = false;
export const onKeypress = (e: any) => {
	if (e.key === '.' && e.target.value.indexOf('.') !== -1 && !selectedDot) e.preventDefault();
	selectedDot = false;

	if (e.key === 'e') e.preventDefault();
};

export const onInput = (e: any) => {
	if (
		e.target.value.indexOf('.') <
			e.target.value.length - e.target.getAttribute('data-toFixed') - 1 &&
		e.target.value.indexOf('.') !== -1
	) {
		let newValue;
		newValue = e.target.value.slice(
			0,
			e.target.value.indexOf('.') + parseInt(e.target.getAttribute('data-toFixed')) + 1,
		);
		newValue = parseFloat(newValue);
		e.target.value = newValue;
	}
	if (e.target.value !== '') {
		lastValidInputValue = e.target.value;
	} else if (e.inputType.match(/delete/g)) {
		lastValidInputValue = '';
	} else {
		e.target.value = lastValidInputValue;
	}
};
export const onSelect = () => {
	if (window!.getSelection()!.toString().indexOf('.') > -1) selectedDot = true;
};
