import * as React from 'react';

import { ReactComponent as CalendarIcon } from '../../../../assets/img/calendar-icon.svg';

import './style.scss';

const getButtonProps = (
	disabled?: boolean,
	onClick?:
		| (React.MouseEventHandler<HTMLInputElement> & React.MouseEventHandler<SVGElement>)
		| undefined,
) => {
	if (disabled) {
		return {};
	}

	return {
		tabIndex: 0,
		role: 'button',
		onClick,
	};
};

export const InputWithIcon = (
	props: JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLInputElement> &
		React.InputHTMLAttributes<HTMLInputElement> &
		React.SVGAttributes<SVGElement>,
) => {
	const { disabled, onClick } = props;

	return (
		<div className="inputWithIcon">
			<input {...props} className="date-input" readOnly />
			<CalendarIcon className="calendarIcon" {...getButtonProps(disabled, onClick)} />
		</div>
	);
};
