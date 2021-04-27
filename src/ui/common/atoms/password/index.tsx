import * as React from 'react';

import './styles.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input value. Use text
   */
  text?: React.ReactNode;
  /**
   * Marks the input as required
   */
  required?: boolean;
  /**
   * Type of the input. Can be 'text', 'email', 'password'
   */
  type?: 'text' | 'email' | 'password';
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
  style?: React.CSSProperties;
}

export const Input: React.FC<InputProps> = (props) => {
  const { text, customClass, ...p } = props;

  return (
    <input className={`oc-input-component ${customClass}`} {...p}>
      {text || ''}
    </input>
  );
};
