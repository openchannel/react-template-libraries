export const getCurrentOffsetValue = (
	currentStep: number,
	maxStepsToShow: number,
	progressbarData: string | any[],
	staticOffsetValue: number,
	setCurrentOffsetValue: {
		(value: React.SetStateAction<number>): void;
		(value: React.SetStateAction<number>): void;
		(arg0: number): void;
	},
): void => {
	if (currentStep <= Math.ceil(maxStepsToShow / 2)) {
		setCurrentOffsetValue(0);
	} else if (currentStep > progressbarData.length - Math.floor(maxStepsToShow / 2)) {
		setCurrentOffsetValue(
			(staticOffsetValue * (progressbarData.length - maxStepsToShow - 1) + 80) * -1,
		);
	} else {
		if (currentStep - (progressbarData.length - Math.floor(maxStepsToShow / 2)) === 0) {
			setCurrentOffsetValue(
				(staticOffsetValue * (currentStep - Math.ceil(maxStepsToShow / 2) - 1) + 80) * -1,
			);
		} else {
			setCurrentOffsetValue(staticOffsetValue * (currentStep - Math.ceil(maxStepsToShow / 2)) * -1);
		}
	}
};

export const calcProgressBarItemStyles = (
	progressbarData: string | any[],
	maxStepsToShow: string | number,
) =>
	progressbarData.length > maxStepsToShow && maxStepsToShow > 0
		? 'calc(100% / ' + maxStepsToShow + ')'
		: 'calc((100% - 80px) / ' + (progressbarData.length - 1) + ')';
