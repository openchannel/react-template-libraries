import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input value. Use text
   */
  text?: string;
  /**
   * Marks the input as required
   */
  required?: boolean;
  /**
   * Type of the input. Can be 'text', 'email', 'password'
   */
  inputType?: 'text' | 'email' | 'password';
  /**
   * Autocomplete
   */
  autocomplete?: boolean;
  /**
   * Set auto focus to true or false
   */
  autoFocus?: boolean;
  /**
   * List of classes which can be attached to the current list
   */
  customClass?: string;
  /**
   * Set disabled state for input
   */
  disabled?: boolean;
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  onClick?: React.MouseEventHandler;
  /**
   * Style which can be added to the title
   * Supposed to be the style object
   */
  customStyle?: any;
}

export const Input: React.FC<InputProps> = (props) => {
  const { text, customClass, inputType, placeholder, ...p } = props;

  return (
    <input
      type={inputType}
      className={`oc-input-component form-control ${customClass}`}
      {...p}
      placeholder={placeholder}
    />
  );
};
