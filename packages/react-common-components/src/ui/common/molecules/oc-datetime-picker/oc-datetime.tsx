import * as React from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import moment, { Moment } from 'moment';

import { InputWithIcon } from './icon-input';
import { OcTimePicker } from './oc-timepicker';

import './style.scss';

moment.updateLocale('en', {
	weekdays: 'S_M_T_W_T_F_S'.split('_'),
	weekdaysShort: 'S_M_T_W_T_F_S'.split('_'),
	weekdaysMin: 'S_M_T_W_T_F_S'.split('_'),
	week: { dow: 1 },
});

export interface DatepickerProps extends DatetimepickerProps {
	/**
	 * List of classes which can be attached to the current list
	 */
	customClass?: string;
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
	value: string | Moment;
	/**
	 * Set Date of datepicker
	 */
	onChange: (value: string | Moment) => void;
	/**
	 * Custom date format to pass into component
	 */
	settings?: string;
}

export const OcDatetimePicker: React.FC<DatepickerProps> = (props) => {
	const { customClass, type, disabled, value, onChange, settings } = props;

	const [timeVisible, setTimeVisible] = React.useState(false);

	const handleOpen = React.useCallback(() => setTimeVisible(true), [setTimeVisible]);
	const handleClose = React.useCallback(() => setTimeVisible(false), [setTimeVisible]);

	const renderWithTime = React.useCallback(
		(mode: string, renderDefault: any) => {
			if (mode !== 'days') return renderDefault();
			return (
				<>
					{renderDefault()}
					{type === 'datetime' && timeVisible && <OcTimePicker value={value} onChange={onChange} />}
				</>
			);
		},
		[type, timeVisible, onChange, value],
	);

	if (true) {
		return <div>File upload component is broken. Will be fixed soon.</div>;
	}

	return (
		<Datetime
			className={customClass}
			locale="en"
			dateFormat={type === 'date' ? settings || 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm'}
			value={value || 'DD/MM/YYYY'}
			onChange={onChange}
			initialViewMode="days"
			timeFormat={false}
			renderInput={InputWithIcon}
			inputProps={{ disabled }}
			renderView={renderWithTime}
			onOpen={handleOpen}
			onClose={handleClose}
		/>
	);
};

export default OcDatetimePicker;
