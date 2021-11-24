import * as React from 'react';
import { DayPickerProps } from 'react-day-picker';
import DayPicker from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import { Navbar } from './navbar';
import { InputWithIcon } from './icon-input';
import { OcTimePicker } from './oc-timepicker';

import { WEEK, WEEKDAYS_SHORT, WEEKDAYS_LONG, MONTHS } from './constants';
import 'react-day-picker/lib/style.css';
import './style.scss';

export interface DatepickerProps extends DayPickerProps {
	/**
	 * Type of picker input: "datetime" or "date"
	 */
	type: 'datetime' | 'date';
	/**
	 * Set disabled state of input
	 */
	disabled?: boolean;
	/**
	 * Date of datepicker
	 */
	value: Date;
	/**
	 * Set Date of datepicker
	 */
	onChange: (value: Date) => void;
	/**
	 * Custom date format to pass into component
	 */
	settings?: string;
}

export const OcDatetimePicker: React.FC<DatepickerProps> = (props) => {
	const { type = 'date', disabled, value, onChange, settings = '' } = props;
	const { formatDate } = MomentLocaleUtils;
	const [timeVisible, setTimeVisible] = React.useState(false);
	const handleToggleInput = () => setTimeVisible(!timeVisible);
	const inputRef: React.RefObject<HTMLDivElement> = React.useRef(null);

	React.useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (inputRef?.current && !inputRef.current.contains(event.target as Node)) {
				setTimeVisible(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [inputRef]);

	const placeholderFormat = React.useMemo(
		() => (type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'),
		[type],
	);
	const inputValue = React.useMemo(
		() => (Boolean(value) === false ? '' : formatDate(value, placeholderFormat, 'en')),
		[value, placeholderFormat],
	);

	return (
		<div ref={inputRef}>
			<InputWithIcon
				placeholder={placeholderFormat}
				value={inputValue}
				onClick={handleToggleInput}
				disabled={disabled}
				className="date-input"
			/>
			{timeVisible && (
				<div className="rdtPicker">
					<DayPicker
						showOutsideDays
						firstDayOfWeek={WEEK}
						weekdaysLong={WEEKDAYS_LONG}
						weekdaysShort={WEEKDAYS_SHORT}
						months={MONTHS}
						fixedWeeks
						onDayClick={onChange}
						selectedDays={new Date(value)}
						navbarElement={Navbar}
					/>
					{type === 'datetime' && timeVisible && (
						<OcTimePicker value={new Date(value)} onChange={onChange} />
					)}
				</div>
			)}
		</div>
	);
};

export default OcDatetimePicker;
