import * as React from 'react';
import CalendarIcon from '../../../../assets/img/calendar-icon.svg';
import './style.scss';

export const InputWithIcon = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement> &
    React.SVGAttributes<SVGElement>,
) => (
  <div className="inputWithIcon">
    <input {...props} />
    <CalendarIcon className="calendarIcon" onClick={props.onClick} />
  </div>
);
