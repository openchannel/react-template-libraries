//commit 76bf4f179cc8ee87ed5117f7d80d1abb451cc096 Author: Julia Date: 06.10.20, 12:59
import * as React from 'react';
import './style.scss';

export interface InputNumberProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Marks the input as required
   */
  required?: boolean;
  /**
   * Set disabled state for input
   */
  disabled?: boolean;
  /**
   * Type of the input. Can be 'text', 'email', 'password'
   */
  inputType?: 'text' | 'email' | 'password' | 'number';
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  /**
   * List of classes which can be attached to the current list
   */
  customClass?: string;
}

export const OcNumberComponent: React.FC<InputNumberProps> = (props) => {
  return <input type="number" className={`form-control ${props.customClass}`} {...props} />;
};
