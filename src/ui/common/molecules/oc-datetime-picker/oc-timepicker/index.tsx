import * as React from 'react';
import moment, { Moment } from 'moment';
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
  onChange: (value: string | Moment) => void;
  /**
   * Inline styles passed to component
   */
  style?: React.CSSProperties;
}

export const OcTimePicker: React.FC<TimepickerProps> = (props) => {
  const { value, onChange, style } = props;
  const [valueMoment, setValueMoment] = React.useState(moment(value));
  console.log('OC Time Picker', value);

  React.useEffect(() => {
    setValueMoment(moment(value));
    console.log('OC TimePicker USE EFFECT', value);
  }, [value]);

  const modifyDate = (
    action: 'add' | 'subtract',
    quantity: number,
    measure: 'hours' | 'minutes',
  ) => {
    return action === 'add'
      ? (setValueMoment(valueMoment.add(quantity, measure)), onChange(valueMoment))
      : onChange(valueMoment.subtract(quantity, measure));
  }; //REFARCTOR THIS
  const addHour = React.useCallback(() => modifyDate('add', 1, 'hours'), [modifyDate]);
  const addMinute = React.useCallback(() => modifyDate('add', 1, 'minutes'), [modifyDate]);
  const decHour = React.useCallback(() => modifyDate('subtract', 1, 'hours'), [modifyDate]);
  const decMinute = React.useCallback(() => modifyDate('subtract', 1, 'minutes'), [modifyDate]);
  return (
    <div className="date-picker__time-view" style={style}>
      <div className="date-picker__time">
        <div className="date-picker__time-hours">
          <div className="date-picker__time-header">Hours</div>
          <div className="date-picker__time-manipulators">
            <ArrowLeftAnalog className="date-picker__time-calendar-icon" onClick={decHour} />
            <input
              type="text"
              value={valueMoment.hours()}
              maxLength={2}
              max="60"
              onChange={(e) => onChange(valueMoment.hours(parseInt(e.target.value || '0')))}
            />
            <ArrowRightAnalog className="date-picker__time-calendar-icon" onClick={addHour} />
          </div>
        </div>
        <div className="date-picker__time-minutes">
          <div className="date-picker__time-header">Minutes</div>
          <div className="date-picker__time-manipulators">
            <ArrowLeftAnalog className="date-picker__time-calendar-icon" onClick={decMinute} />
            <input
              type="text"
              maxLength={2}
              max="60"
              value={valueMoment.minutes()}
              onChange={(e) => {
                onChange(valueMoment.minutes(parseInt(e.target.value || '0')));
              }}
            />
            <ArrowRightAnalog className="date-picker__time-calendar-icon" onClick={addMinute} />
          </div>
        </div>
      </div>
    </div>
  );
};
