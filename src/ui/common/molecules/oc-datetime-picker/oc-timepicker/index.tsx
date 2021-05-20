import * as React from 'react';
import { Moment } from 'moment';
import moment from 'moment';
import ArrowLeftAnalog from '../../../../../assets/img/arrow-left-analog.svg';
import ArrowRightAnalog from '../../../../../assets/img/arrow-right-analog.svg';

import './style.scss';

export interface TimepickerProps {
  /**
   * Date of datepicker
   */
  value: string;
  /**
   * Set Date of datepicker
   */
  setDate: (value: string | Moment) => void;
  /**
   * Inline styles passed to component
   */
  style?: React.CSSProperties;
}

export const OcTimePicker: React.FC<TimepickerProps> = (props) => {
  const { value, setDate, style } = props;
  const valueMoment = moment(value);
  let hourValue = valueMoment.hours();
  let minuteValue = valueMoment.minutes();
  const modifyDate = React.useCallback(
    (action: 'add' | 'subtract', quantity: number, measure: 'hours' | 'minutes') => {
      return action === 'add'
        ? setDate(valueMoment.add(quantity, measure))
        : setDate(valueMoment.subtract(quantity, measure));
    },
    [setDate],
  );
  return (
    <div className="date-picker__time-view" style={style}>
      <div className="date-picker__time">
        <div className="date-picker__time-hours">
          <div className="date-picker__time-header">Hours</div>
          <div className="date-picker__time-manipulators">
            <ArrowLeftAnalog
              className="date-picker__time-calendar-icon"
              onClick={() => modifyDate('subtract', 1, 'hours')}
            />
            <input
              type="text"
              value={hourValue.toString()}
              maxLength={2}
              max="60"
              onChange={(e) => setDate(valueMoment.hours(parseInt(e.target.value || '0')))}
            />
            <ArrowRightAnalog
              className="date-picker__time-calendar-icon"
              onClick={() => modifyDate('add', 1, 'hours')}
            />
          </div>
        </div>
        <div className="date-picker__time-minutes">
          <div className="date-picker__time-header">Minutes</div>
          <div className="date-picker__time-manipulators">
            <ArrowLeftAnalog
              className="date-picker__time-calendar-icon"
              onClick={() => modifyDate('subtract', 1, 'minutes')}
            />
            <input
              type="text"
              maxLength={2}
              max="60"
              value={minuteValue.toString()}
              onChange={(e) => {
                setDate(valueMoment.minutes(parseInt(e.target.value || '0')));
              }}
            />
            <ArrowRightAnalog
              className="date-picker__time-calendar-icon"
              onClick={() => modifyDate('add', 1, 'minutes')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
