import { Moment } from 'moment';
import moment from 'moment';
import * as React from 'react';
import Datetime, { DatetimepickerProps } from 'react-datetime';
import { OcTimePicker } from './oc-timepicker/index';
import { InputWithIcon } from './icon-input';
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
  const [timeVisible, setTimeVisible] = React.useState(false);
  moment.updateLocale('en', {
    weekdays: 'M_T_W_T_F_S_S'.split('_'),
    weekdaysShort: 'M_T_W_T_F_S_S'.split('_'),
    weekdaysMin: 'M_T_W_T_F_S_S'.split('_'),
  });
  const renderWithTime = (mode: string, renderDefault: Function) => {
    if (mode === 'date') return renderDefault();
    return (
      <>
        {renderDefault()}
        {type === 'datetime' && (
          <OcTimePicker
            value={date.toString()}
            setDate={setDate}
            style={{ display: timeVisible ? 'block' : 'none' }}
          />
        )}
      </>
    );
  };
  return (
    <Datetime
      locale="en"
      dateFormat="DD/MM/YYYY HH:mm"
      inputProps={{ disabled: disabled }}
      value={date}
      onChange={setDate}
      initialViewMode="days"
      timeFormat={false}
      renderInput={InputWithIcon}
      renderView={(mode, renderDefault) => renderWithTime(mode, renderDefault)}
      onOpen={() => setTimeVisible(true)}
      onClose={() => setTimeVisible(false)}
    />
  );
};
