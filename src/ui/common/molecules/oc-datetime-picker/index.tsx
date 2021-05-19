import { Moment } from 'moment';
import moment from 'moment';
import * as React from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import CalendarIcon from '../../../../assets/img/calendar-icon.svg';
import OcTimepicker from './oc-timepicker/index';
import './style.scss';

export interface DatepickerProps extends DatetimepickerProps {
  /**
   * Type of picker input: "datetime" or "date"
   */
  type: 'datetime' | 'date';
  /**
   * Set disabled state of input
   */
  disabled: boolean;
  /**
   * Date of datepicker
   */
  date: string | Moment;
  /**
   * Set Date of datepicker
   */
  setDate: (value: string | Moment) => void;
}

export const OcDatetimePicker: React.FC<DatepickerProps> = (props) => {
  const { type, disabled, date, setDate } = props;
  const inputWithIcon = (props: any) => (
    <div className="inputWithIcon">
      <input {...props} />
      <CalendarIcon className="calendarIcon" onClick={props.onClick} />
    </div>
  );
  moment.updateLocale('en', {
    weekdays: 'M_T_W_T_F_S_S'.split('_'),
    weekdaysShort: 'M_T_W_T_F_S_S'.split('_'),
    weekdaysMin: 'M_T_W_T_F_S_S'.split('_'),
  });
  return (
    <div className="date-picker">
      <Datetime
        locale="en"
        dateFormat="DD/MM/YYYY HH:mm"
        inputProps={{ disabled: disabled }}
        value={date}
        onChange={setDate}
        initialViewMode="days"
        timeFormat={false}
        renderInput={inputWithIcon}
      />
      {type === 'datetime' && <OcTimepicker value={date.toString()} setDate={setDate} />}
    </div>
  );
};
