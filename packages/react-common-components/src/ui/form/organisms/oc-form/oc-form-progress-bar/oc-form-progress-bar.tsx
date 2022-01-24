import * as React from 'react';

import { ReactComponent as ContentStatusIcon } from '../../../../../assets/img/icon-check.svg';

import { calcProgressBarItemStyles, getCurrentOffsetValue } from './utils';
import './style.scss';

export interface OcFormProgressBarProps {
	progressbarData: FormProgressbarStep[];
	jumpToStep: (step: number) => void;
	maxStepsToShow?: number;
	currentStep: number | undefined;
	enableTextTruncation?: boolean;
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
		getCurrentOffsetValue(
			currentStep,
			maxStepsToShow,
			progressbarData,
			staticOffsetValue,
			setCurrentOffsetValue,
		);
	}, [currentStep]);

	const getStaticOffsetValue = (): void => {
		if (stepsContainerRef.current !== null && stepsContainerRef.current?.firstChild !== null) {
			const firstBarStep = stepsContainerRef.current?.firstChild as any;
			setStaticOffsetValue(firstBarStep.offsetWidth);
		}
	};

	const stepClicked = (step: number): void => {
		jumpToStep(step);
		getCurrentOffsetValue(
			currentStep,
			maxStepsToShow,
			progressbarData,
			staticOffsetValue,
			setCurrentOffsetValue,
		);
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
								width: `${calcProgressBarItemStyles(progressbarData, maxStepsToShow)}`,
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
