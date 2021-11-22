import * as React from 'react';
import isNil from 'lodash';
import { NavbarElementProps, DayPickerProps } from 'react-day-picker';
import DayPicker from 'react-day-picker/DayPicker';
import MomentLocaleUtils from 'react-day-picker/moment';

import { InputWithIcon } from './icon-input';
import { OcTimePicker } from './oc-timepicker';
import { ReactComponent as PrevIcon } from '../../../../assets/img/arrow-left-analog.svg';
import { ReactComponent as NextIcon } from '../../../../assets/img/arrow-right-analog.svg';

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
	const dateValue = React.useMemo(() => (isNil(value) ? new Date() : value), [value]);
	const handleToggleInput = () => setTimeVisible(!timeVisible);

	const Navbar = ({ onPreviousClick, onNextClick, className }: NavbarElementProps) => {
		const styleLeft = {
			float: 'left',
			cursor: 'pointer',
		};
		const styleRight = {
			float: 'right',
			cursor: 'pointer',
		};
		return (
			<div className={className}>
				<PrevIcon style={styleLeft} onClick={() => onPreviousClick()} />
				<NextIcon style={styleRight} onClick={() => onNextClick()} />
			</div>
		);
	};

	const useOutsideClick = (ref: React.RefObject<HTMLDivElement>) => {
		React.useEffect(() => {
			const handleClickOutside = (event: any) => {
				if (ref?.current && !ref.current.contains(event.target)) {
					setTimeVisible(false);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}, [ref]);
	};
	const inputRef = React.useRef(null);
	useOutsideClick(inputRef);

	return (
		<div ref={inputRef}>
			<InputWithIcon
				placeholder={`${formatDate(
					dateValue,
					type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm',
					'en',
				)}`}
				value={formatDate(dateValue, type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm', 'en')}
				// onChange={onChange}
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
						selectedDays={dateValue}
						navbarElement={Navbar}
					/>
					{type === 'datetime' && timeVisible && (
						<OcTimePicker value={dateValue} onChange={onChange} />
					)}
				</div>
			)}
		</div>
	);
};

export default OcDatetimePicker;
