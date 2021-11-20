import * as React from 'react';
import DayPicker from 'react-day-picker/DayPicker';
// import Datetime, { DatetimepickerProps } from 'react-datetime';
// import moment, { Moment } from 'moment';

import { InputWithIcon } from './icon-input';
import { OcTimePicker } from './oc-timepicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { ReactComponent as PrevIcon } from '../../../../assets/img/arrow-left-analog.svg';
import { ReactComponent as NextIcon } from '../../../../assets/img/arrow-right-analog.svg';

import { week, weekdaysShort, weekdaysLong } from './constants';
import 'react-day-picker/lib/style.css';
import './style.scss';

// export interface DatepickerProps extends DatetimepickerProps {
// 	/**
// 	 * List of classes which can be attached to the current list
// 	 */
// 	customClass?: string;
// 	/**
// 	 * Type of picker input: "datetime" or "date"
// 	 */
// 	type: 'datetime' | 'date';
// 	/**
// 	 * Set disabled state of input
// 	 */
// 	disabled?: boolean;
// 	/**
// 	 * Date of datepicker
// 	 */
// 	value: string | Moment;
// 	/**
// 	 * Set Date of datepicker
// 	 */
// 	onChange: (value: string | Moment) => void;
// 	/**
// 	 * Custom date format to pass into component
// 	 */
// 	settings?: string;
// }

export const OcDatetimePicker: React.FC<any> = (props) => {
	const { customClass, type, disabled, value, onChange, settings } = props;
	const { formatDate, parseDate } = MomentLocaleUtils;
	const [timeVisible, setTimeVisible] = React.useState(false);

	const handleToggleInput = React.useCallback(() => setTimeVisible(!timeVisible), [setTimeVisible]);

	const additional = () => {
		const renderWithTime = React.useCallback(
			(mode: string, renderDefault: any) => {
				if (mode !== 'days') return renderDefault();
				return (
					<>
						{renderDefault()}
						{type === 'datetime' && timeVisible && (
							<OcTimePicker value={value} onChange={onChange} />
						)}
					</>
				);
			},
			[type, timeVisible, onChange, value],
		);

		// if (true) {
		// 	return <div>Datetime component is broken. Will be fixed soon.</div>;
		// }
	};
	const handleFormatDate = (val: Date, format: string, locale: string) =>
		formatDate(value, type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm', 'en');

	const Navbar = ({
		nextMonth,
		previousMonth,
		onPreviousClick,
		onNextClick,
		className,
		localeUtils,
	}) => {
		const months = localeUtils.getMonths();
		const styleLeft = {
			float: 'left',
		};
		const styleRight = {
			float: 'right',
		};
		return (
			<div className={className}>
				<PrevIcon style={styleLeft} onClick={() => onPreviousClick()} />
				<NextIcon style={styleRight} onClick={() => onNextClick()} />
			</div>
		);
	};
	return (
		<div>
			<InputWithIcon
				{...props}
				placeholder={`${formatDate(
					value,
					type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm',
					'en',
				)}`}
				value={formatDate(
					value,
					type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm',
					'en',
				)}
				onChange={onChange}
				onClick={handleToggleInput}
				disabled={disabled}
				className="date-input"
			/>
			{timeVisible && (
				<div className="rdtPicker">
					<DayPicker
						showOutsideDays
						enableOutsideDaysClick={false}
						firstDayOfWeek={week}
						weekdaysLong={weekdaysLong}
						weekdaysShort={weekdaysShort}
						fixedWeeks
						onDayChange={onChange}
						value={value}
						formatDate={handleFormatDate}
						parseDate={parseDate}
						placeholder={`${formatDate(
							value,
							type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm',
							'en',
						)}`}
						navbarElement={<Navbar />}
					/>
					{type === 'datetime' && timeVisible && <OcTimePicker value={value} onChange={onChange} />}
				</div>
			)}
		</div>
		// <Datetime
		// 	className={customClass}
		// 	locale="en"
		// 	dateFormat={type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'}
		// 	value={value || 'DD/MM/YYYY'}
		// 	onChange={onChange}
		// 	initialViewMode="days"
		// 	timeFormat={false}
		// 	renderInput={InputWithIcon}
		// 	inputProps={{ disabled }}
		// 	renderView={renderWithTime}
		// 	onOpen={handleOpen}
		// 	onClose={handleClose}
		// />
	);
};

export default OcDatetimePicker;
