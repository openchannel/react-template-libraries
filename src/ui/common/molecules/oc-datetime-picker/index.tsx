import moment, { Moment } from 'moment';
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
  value: string | Moment;
  /**
   * Set Date of datepicker
   */
  onChange: (value: string | Moment) => void;
}
moment.updateLocale('en', {
  weekdays: 'S_M_T_W_T_F_S'.split('_'),
  weekdaysShort: 'S_M_T_W_T_F_S'.split('_'),
  weekdaysMin: 'S_M_T_W_T_F_S'.split('_'),
  week: {
    dow: 1,
  },
});

export const OcDatetimePicker: React.FC<DatepickerProps> = (props) => {
  const { type, disabled, value, onChange } = props;

  const [timeVisible, setTimeVisible] = React.useState(false);

  const handleOpen = () => setTimeVisible(true);
  const handleClose = () => setTimeVisible(false);

  const renderWithTime = React.useCallback(
    (mode: string, renderDefault: Function) => {
      if (mode === 'date') return renderDefault();
      return (
        <>
          {renderDefault()}
          {type === 'datetime' && (
            <OcTimePicker
              value={value}
              onChange={onChange}
              style={{ display: timeVisible ? 'block' : 'none' }}
            />
          )}
        </>
      );
    },
    [type, timeVisible, onChange, value],
  );
  return (
    <Datetime
      locale="en"
      dateFormat={type === 'datetime' ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'}
      inputProps={{ disabled: disabled }}
      value={value}
      onChange={onChange}
      initialViewMode="days"
      timeFormat={false}
      renderInput={InputWithIcon}
      renderView={renderWithTime}
      onOpen={handleOpen}
      onClose={handleClose}
    />
  );
};
