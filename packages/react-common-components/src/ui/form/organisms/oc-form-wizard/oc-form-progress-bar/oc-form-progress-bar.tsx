import * as React from 'react';

import { ReactComponent as ContentStatusIcon } from '../../../../../assets/img/icon-check.svg';

import './style.scss';

export interface OcFormProgressBarProps {
	progressbarData: FormProgressbarStep[];
	jumpToStep: (step: number) => void;
	maxStepsToShow?: number;
	currentStep: number | undefined;
	enableTextTruncation?: boolean;
	errors: any;
}

export interface FormProgressbarStep {
	title: string;
	state: 'pristine' | 'finished' | 'invalid';
}

export const OcFormProgressBar: React.FC<OcFormProgressBarProps> = (props) => {
	const {
		progressbarData = [],
		currentStep = 1,
		maxStepsToShow = 0,
		jumpToStep,
		errors,
		// staticOffsetValue,
		// currentOffsetValue,
		// enableTextTruncation = false,
	} = props;

	const [staticOffsetValue, setStaticOffsetValue] = React.useState(0);
	const [currentOffsetValue, setCurrentOffsetValue] = React.useState(0);
	const stepsContainerRef = React.useRef<HTMLDivElement>(null);

	const getNextStep = (currentStep: number) => progressbarData[currentStep];

	React.useEffect(() => {
		getStaticOffsetValue();
	}, [progressbarData]);
	React.useEffect(() => {
		getCurrentOffsetValue();
	}, [currentStep]);

	const getStaticOffsetValue = (): void => {
		if (stepsContainerRef.current !== null && stepsContainerRef.current?.firstChild !== null) {
			const firstBarStep = stepsContainerRef.current?.firstChild as any;
			setStaticOffsetValue(firstBarStep.offsetWidth);
		}
	};
	const getCurrentOffsetValue = (): void => {
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
				setCurrentOffsetValue(
					staticOffsetValue * (currentStep - Math.ceil(maxStepsToShow / 2)) * -1,
				);
			}
		}
	};

	const stepClicked = (step: number): void => {
		jumpToStep(step);
		getCurrentOffsetValue();
	};

	return (
		<div className="form-progressbar">
			<div
				className={`form-progressbar__slidebox `}
				style={{ transform: `translate(${currentStep > 1 ? currentOffsetValue : 0}px, 0px)` }}
				ref={stepsContainerRef}
			>
				{progressbarData.length > 1 &&
					progressbarData.map((step, i) => (
						<div
							className={`form-progressbar__item ${
								currentStep === i + 1 ? 'form-progressbar__item_current' : ''
							} 
                        ${step.state === 'finished' && 'form-progressbar__item_finished'}
                        ${step.state === 'invalid' && 'form-progressbar__item_invalid'}`}
							style={{
								width: `${
									progressbarData.length > maxStepsToShow && maxStepsToShow > 0
										? 'calc(100% / ' + maxStepsToShow + ')'
										: 'calc((100% - 80px) / ' + (progressbarData.length - 1) + ')'
								}`,
							}}
							key={i}
						>
							<div className="form-progressbar__item-content" onClick={() => stepClicked(i + 1)}>
								<div className="form-progressbar__item-content-shape">
									{step.state !== 'finished' && (
										<span className="form-progressbar__item-content-status">
											{step.state === 'pristine' ? i + 1 : '!'}
										</span>
									)}
									<div className="form-progressbar__item-content-animation"></div>
									{step.state === 'finished' && (
										<div className="form-progressbar__item-content-status">
											<ContentStatusIcon className="form-progressbar__item-content-status-icon" />
										</div>
									)}
								</div>
								<div className="form-progressbar__item-content-title" title={step.title}>
									{step.title}
								</div>
							</div>
							{i + 1 < progressbarData.length && (
								<div
									className={`form-progressbar__item-divider ${
										(getNextStep(i + 1).state !== 'pristine' ||
											(getNextStep(i + 1).state === 'pristine' && currentStep === i + 2)) &&
										'form-progressbar__item-divider_straight'
									}
            `}
								></div>
							)}
						</div>
					))}
			</div>
		</div>
	);
};
